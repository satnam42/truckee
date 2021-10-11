import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthsService } from './../../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router,
    private route: ActivatedRoute,
    public authService: AuthsService,
  ) {
  }
  get lf() {
    return this.loginForm.controls;
  }
  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      grant_type: 'password'
    }
    this.authService.login(credentials).subscribe((res: any) => {
      console.log('login:user', res)
      if (res) {
        if (res.role == 'DRIVER') {
          this.router.navigate(['/dashboard/driver']);
        }
        else {
          this.router.navigate(['/dashboard']);
        }
      }
    })
  }

}
