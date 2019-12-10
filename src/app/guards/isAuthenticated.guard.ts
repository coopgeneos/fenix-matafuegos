import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private authService : AuthService, private route : Router) { }

  canActivate(){
    if(this.authService.isAuthenticated()){
      return true;
    }
    this.route.navigate(['signin']);
    return false;
  }
}
