import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import {AuthService} from './auth.service'
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // API call to node js from auth service(to be created)
    let body = {
      userName: next.params.userName,
      password: next.params.userPassword,
      userCompany: next.params.userCompany,
      userPlant: next.params.userPlant
    }  // get body
    return this.authService.authorize(body).pipe(
      map(value => {
        let check = JSON.parse(value).status
        if(check === 200) {
          return true
        } else {
          return false
        }
      })
    ) 
  }
}
