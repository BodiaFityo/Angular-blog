import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

interface Errors {
    required: string;
    email: string;
}

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    form: FormGroup;
    errors: Errors[] = [
        {
            required: 'This field is required',
            email: 'Email should be in next format: example@mail.com',
        }
    ];
    submited = false;

    constructor(
        public authService: AuthService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(
                null, [
                    Validators.required,
                    Validators.email,
                ]
            ),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ])
        });
        this.authService.error$
            .subscribe(error => {
                console.log(error);
            });
    }

    emailFieldError(): boolean {
        const email = this.form.get('email');
        return email.invalid && email.touched;
    }

    emailErrorMsg(): string {
        const errors = this.form.get('email').errors;
        let errorMsg = '';
        for (const key of Object.keys(errors)) {
            errorMsg = this.errors[0][key];
        }
        return errorMsg;
    }

    pswFieldError() {
       const password = this.form.get('password');
       return password.invalid && password.touched;
    }

    pswErrorMsg(): string {
        const errors = this.form.get('password').errors;
        let errorMsg = '';
        for (const key of Object.keys(errors)) {
            errorMsg = this.errors[0][key] || `Password length should be ${errors.minlength.requiredLength}`;
        }
        return errorMsg;
    }

    onSubmit() {
        this.submited = true;
        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password,
            returnSecureToken: true,
        };
        this.authService.login(user)
            .subscribe(() => {
                this.form.reset();
                this.router.navigate(['/admin', 'dashboard']);
            },
                error => {
                    this.form.reset();
                });
        this.submited = false;
    }
}
