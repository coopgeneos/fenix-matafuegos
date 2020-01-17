import { Component, OnInit, ElementRef } from '@angular/core';
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
  isAdmin: boolean = null;
  
  menuEntries = [
    {label: "Usuarios", path: "users", show: ["isAdmin"]},
    {label: "Clientes", path: "customers", show: ["isAdmin"]},
    {label: "Tipo de matafuegos", path: "extinguisherstype", show: ["isAdmin"]},
    {label: "Matafuegos", path: "extinguishers", show: ["isAdmin"]},
    {label: "Ordenes", path: "workorders", show: []},
    {label: "Facturación", path: "workordersinvoice", show: ["isAdmin"]},
  ]

  menu = this.menuEntries.filter(entry => {return entry.show});

  section: string = "Ordenes"

  constructor(
    private authService: AuthService,
    private router: Router,
    private userIdle: UserIdleService) { }

  ngOnInit() {
    this.logged = this.authService.getLoggedUser();
    this.authService.isAdmin().subscribe(
      resp => {
        this.menu = this.menuEntries.filter(entry => {
          if(entry.show.length > 0) {
            if(entry.show.includes('isAdmin')) {
              return resp;
            } else return true;
          } else return true;
        });
      },
      error => {
        console.error(error)
      }
    )
  }

  logout() : void {
    localStorage.removeItem('currentUser');
    this.authService.signOut().subscribe(
      response => {
        this.userIdle.stopWatching();
        this.router.navigate(['/signin']);
      },
      error => {
        console.error("Error en el logout "+JSON.stringify(error));
        this.router.navigate(['/signin']);
      }
    )
  }

  selectMenu(label: string) : void {
    this.section = label;
  }

}
