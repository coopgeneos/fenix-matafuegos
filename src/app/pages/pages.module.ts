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
import { ExtinguishersModule } from './extinguishers/extinguishers.module';
import { CommonsModule } from '../commons/commons.module';
import { WorkOrdersModule } from './work-orders/work-orders.module';
import { ConfigurationModule } from './configuration/configuration.module';

@NgModule({
  declarations: [
    PagesComponent,
  ],
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
    CustomersModule,
    ExtinguishersModule,
    WorkOrdersModule,
    CommonsModule,
    ConfigurationModule
  ],
  providers: [
    IsAuthenticatedGuard, 
    IsAdminGuard, 
    AuthService
  ]
})
export class PagesModule { }
