import { Component, OnInit } from '@angular/core';
import { AuthService, LoggedUser } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  logged: LoggedUser;
  
  menuEntries = [
    {label: "Usuarios", path: "users", show: this.authService.isAdmin()},
    {label: "Clientes", path: "customers", show: this.authService.isAdmin()},
    {label: "Tipo de matafuegos", path: "extinguisherstype", show: this.authService.isAdmin()},
    {label: "Matafuegos", path: "extinguishers", show: this.authService.isAdmin()},
    {label: "Ordenes", path: "workorders", show: true},
    {label: "Facturación", path: "workordersinvoice", show: this.authService.isAdmin()},
  ]

  menu = this.menuEntries.filter(entry => {return entry.show});

  section: string = "Ordenes"

  constructor(
    private authService: AuthService,
    private router: Router,
    private userIdle: UserIdleService) { }

  ngOnInit() {
    this.logged = this.authService.getLoggedUser();
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

  selectMenu(label: string) : void {
    this.section = label;
  }

}
