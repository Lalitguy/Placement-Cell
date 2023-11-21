import { AuthService } from '../shared/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private AuthService: AuthService){};
   
 canActivate(
 route: ActivatedRouteSnapshot,
 state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   if(localStorage.getItem('token')){
      return true;
    }
   
   return this.AuthService.isLoggedIn;
 }
 
}