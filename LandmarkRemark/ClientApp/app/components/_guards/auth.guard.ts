﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        try {
            if (localStorage.getItem('currentUser')) {
                //return true of logged in 
                return true;
            }

            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        catch(e){
        }
        return false
    }
}