import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app/app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private config: AppConfig) { }

    login(username: string, password: string, baseUrl: string) {
        return this.http.post(baseUrl + 'Users/Authenticate', { Username: username, Password: password })
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    // store user details
                    localStorage.setItem('currentUser', JSON.stringify(user.username));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isLoggedIn() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        return true;
    }
}