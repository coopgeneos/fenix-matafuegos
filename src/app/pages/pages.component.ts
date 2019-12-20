import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userIdle: UserIdleService) { }

  ngOnInit() {
  }

  logout() : void {
    localStorage.removeItem('currentUser');
    this.authService.signOut().subscribe(
      response => {
        this.userIdle.stopWatching();
        this.router.navigate(['/signin']);
      },
      error => {
        console.error("Error en el logout "+JSON.stringify(error))
      }
    )
  }

}
