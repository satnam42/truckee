import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorageService } from 'app/services/local-storage.service';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { PasswordStrengthValidator } from 'app/shared/services/password-strength.validators';
import { AuthsService } from './../../../services/auth.service';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent implements OnInit {
    // @ViewChild('f') forogtPasswordForm: NgForm;
    forgotPassFormSubmitted = false;
    resetPassFormSubmitted = false;
    email: string = ""
    resetPassForm: FormGroup;
    isForgotPassForm = true
    isResetPassForm = false
    forgotPassForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
    });

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public authService: AuthsService,
        private store: LocalStorageService,
        private ref: ChangeDetectorRef
    ) {
        this.resetPassForm = this.formBuilder.group({
            verificationCode: [Validators.required],
            password: [Validators.required],
            confirmPassword: [Validators.required, PasswordStrengthValidator],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });



    }
    ngOnInit() {

    }

    // setRequired() {
    //     return [Validators.required];
    // }
    // setPasswordValidation() {
    //     return [Validators.required, PasswordStrengthValidator];
    // }
    get ff() {
        return this.forgotPassForm.controls;
    }
    get rf() {
        return this.resetPassForm.controls;
    }
    // On submit click, reset form fields
    onForgotPass(event: Event) {
        // event.preventDefault();
        // this.forgotPassForm.controls.verificationCode.clearValidators();
        // this.forgotPassForm.controls.password.clearValidators();
        // this.forgotPassForm.controls.confirmPassword.clearValidators();
        // this.forgotPassForm.controls.password.updateValueAndValidity();
        // this.forgotPassForm.controls.confirmPassword.updateValueAndValidity();
        // this.forgotPassForm.controls.verificationCode.updateValueAndValidity();
        // this.ref.detectChanges();
        // this.forogtPasswordForm.reset();
        this.forgotPassFormSubmitted = true;
        if (this.forgotPassForm.invalid) {
            return;
        }
        // if (this.isForgotPassForm) {

        this.authService.forgotPassword(this.forgotPassForm.value.email).subscribe((res: any) => {
            console.log('forgotRes', res)
            if (res) {
                this.isForgotPassForm = false
                this.isResetPassForm = true
            }
            this.resetPassForm.reset()
            // this.forgotPassForm.controls.password.updateValueAndValidity();
            // this.forgotPassForm.controls.confirmPassword.updateValueAndValidity();
            // this.forgotPassForm.controls.verificationCode.updateValueAndValidity();
            // this.forgotPassForm.controls.email.updateValueAndValidity();
            this.ref.detectChanges();
        })
        // } else if (!this.isForgotPassForm) {
        //     this.forgotPassForm.controls.verificationCode.setValidators(this.setRequired());
        //     this.forgotPassForm.controls.password.setValidators(this.setPasswordValidation());
        //     this.forgotPassForm.controls.confirmPassword.setValidators(this.setRequired());
        //     this.authService.resetPassword(this.forgotPassForm.value.verificationCode, this.forgotPassForm.value.password).subscribe((res: any) => {
        //         console.log('resetPasswordRes', res)
        //         if (res) {
        //             this.router.navigate(['/pages/login']);
        //         }
        //     })
        // }

    }

    onResetPass() {
        // this.forogtPasswordForm.reset();
        this.resetPassFormSubmitted = true;
        if (this.resetPassForm.invalid) {
            return;
        }
        this.authService.resetPassword(this.resetPassForm.value.verificationCode, this.resetPassForm.value.password).subscribe((res: any) => {
            console.log('resetPasswordRes', res)
            if (res) {
                this.router.navigate(['/pages/login']);
            }
        })


    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
