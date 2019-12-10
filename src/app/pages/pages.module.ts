import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { 
  MatToolbarModule, 
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
} from '@angular/material';
import { UsersModule } from './users/users.module';

import { IsAuthenticatedGuard } from '../guards/isAuthenticated.guard';
import { AuthService } from '../auth/auth.service';

import { PagesComponent } from './pages.component';
import { IsAdminGuard } from '../guards/isAdmin.guard';
import { CustomersModule } from './customers/customers.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatToolbarModule, 
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    UsersModule,
    CustomersModule
  ],
  providers: [
    IsAuthenticatedGuard, 
    IsAdminGuard, 
    AuthService
  ]
})
export class PagesModule { }
