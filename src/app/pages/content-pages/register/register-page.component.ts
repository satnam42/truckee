import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import { AuthsService } from './../../../services/auth.service';
import { ApiService } from './../../../services/api.service';
import { SharedService } from './../../../services/shared.service';
import { PasswordStrengthValidator } from "../../../shared/services/password-strength.validators"
import { LocalStorageService } from '../../../services/local-storage.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  registerFormSubmitted = false;
  ishidden = false;
  isLoading: boolean = false;
  notMatched: boolean = false;
  registerForm: FormGroup;
  cno: AbstractControl;
  role: string = "driver"
  /**   Condition for carrier role **/


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthsService,
    private apiService: ApiService,
    private sharedService: SharedService,
    private store: LocalStorageService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(12)]],
      cno: [''],
      password: ['', [Validators.required, PasswordStrengthValidator]],
      confirmPassword: ['', Validators.required,],
      acceptTerms: [true, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

  }
  setRequired() {
    return [Validators.required];
  }
  radioButtonChanged(key) {
    if (key == 'carrier') {
      this.registerForm.controls.cno.setValidators(this.setRequired());
      this.role = 'carrier'

    } else {
      this.registerForm.controls.cno.clearValidators();
      this.role = 'driver'
    }
    this.registerForm.controls.cno.updateValueAndValidity();

  }

  ngOnInit() {
    this.getToken()

  }

  getToken() {
    let credentials = {
      Username: 'Truckee-Service',
      Password: 'Truckee-Service'
    }
    this.authService.oauth(credentials).subscribe((res: any) => {
      console.log('res', res)
    })
  }

  get rf() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let body = {
      username: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phoneNo: this.registerForm.value.phone,
      role: this.role
    }
    this.store.setItem('email', this.registerForm.value.email);
    this.authService.signUp(body).subscribe((res: any) => {
      console.log('registerRes', res)
      if (res) {
        this.router.navigate(['/pages/otp']);
      }
    })
  }


}
