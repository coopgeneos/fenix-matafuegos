import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private authService : AuthService, private route : Router) { }

  canActivate() : Observable<boolean> {
    return this.authService.isAdmin().pipe(
      map(
        resp => {
          if (!resp) 
            this.route.navigate(['pages']);
          return resp;
        },
        error => {
          console.error()
          return false
        }
      )
    )    
  }
}