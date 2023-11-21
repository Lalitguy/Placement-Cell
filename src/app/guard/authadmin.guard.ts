import { AuthService } from '../shared/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
   constructor(private AuthService: AuthService){};
   
 canActivate(
 route: ActivatedRouteSnapshot,
 state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
   if(localStorage.getItem('admin-token')){
      return true;
    }
   return this.AuthService.isAdminLoggedIn;
 }
 }