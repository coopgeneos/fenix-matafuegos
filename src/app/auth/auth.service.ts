import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export class LoggedUser {
  id: number;
  name: string;
  username: string;
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(user: any) : Observable<any> {
    return this.http.post(environment.api_url+"user", user)
  }

  signIn(credentials: any) : Observable<any> {
    return this.http.post(environment.api_url+"login", credentials)
  }

  signOut() : Observable<any> {
    return this.http.get(environment.api_url+"logout")/* .pipe(
      map(response => {
        this.clearSession();
        return response;
      })
    ) */
  }

  setSession(user: any) : void {
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  clearSession() : void {
    localStorage.removeItem('currentUser');
  }

  getLoggedUser() : LoggedUser {
    if(this.isAuthenticated()) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
    return null;
  }

  isAuthenticated() : boolean {
    let userData = localStorage.getItem('currentUser')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  // isAdmin() : Observable<boolean> {
    // return this.http.get(environment.api_url+"isAdmin").pipe(
    //   map(resp => {
    //     if(resp['error']) {
    //       return false;
    //     }
    //     else {
    //       return resp['data']
    //     }
    //   })
    // )
  // }

  isAdmin() : Observable<boolean> {
    let userData = localStorage.getItem('currentUser');
    userData = JSON.parse(userData);
    if(userData && userData["role"] === "ADMIN"){
      return of(true);
    }
    return of(false);
  }
}
