import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() : void {
    this.authService.signOut().subscribe(
      response => {
        localStorage.removeItem('currentUser')
        this.router.navigate(['/signin']);
      },
      error => {
        console.error("Cagó el logout "+JSON.stringify(error))
      }
    )
  }

}
