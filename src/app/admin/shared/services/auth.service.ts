import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FireBaseAuthResponse, User} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, debounceTime, delay, tap} from 'rxjs/operators';

@Injectable()

export class AuthService {
    constructor(private http: HttpClient) {
    }
    public error$: Subject<string> = new Subject<string>();

    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;
        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Email is incorrect');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Password is incorrect');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Email doesn\'t exist');
                break;
        }
        return throwError(error);
    }

    get token(): string {
        const expToken = new Date(localStorage.getItem('fb-exp-token'));

        if (new Date() > expToken) {
            this.logout();
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    private setToken(response: FireBaseAuthResponse | null) {
        if (response) {
            const expDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-exp-token', expDate.toString());
        } else {
            localStorage.clear();
        }
    }

    login(user: User): Observable<any> {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            );
    }

    logout() {
        this.setToken(null);
    }

    isAuthenticated() {
        return !!this.token;
    }
}
