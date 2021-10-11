import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthsService } from './../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  otpFormSubmitted = false;
  email: string = ""
  otpForm = new FormGroup({
    otp: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router,
    private route: ActivatedRoute,
    public authService: AuthsService,
    private store: LocalStorageService
  ) {
  }
  ngOnInit() {
    this.email = this.store.getItem('email')
    // this.formControlValueChanged();
  }
  get lf() {
    return this.otpForm.controls;
  }
  // On submit button click
  onSubmit() {
    this.otpFormSubmitted = true;
    if (this.otpForm.invalid) {
      return;
    }

    this.authService.otpVerify(this.otpForm.value.otp, this.email).subscribe((res: any) => {
      console.log('otpVerify', res)
      if (res) {
        this.store.getItem('email')
        this.router.navigate(['/pages/login']);
      }
    })
  }

}
