import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { IsAuthenticatedGuard } from '../guards/isAuthenticated.guard';
import { IsAdminGuard } from '../guards/isAdmin.guard';

import { UsersListComponent } from './users/users-list/users-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomersFormComponent } from './customers/customers-form/customers-form.component';

const routes: Routes = [
  { path: '', component: PagesComponent,
    children: [
      { path: 'users', component: UsersListComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'users/:id', component: UserFormComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'users/0', component: UserFormComponent, canActivate: [IsAuthenticatedGuard] },

      { path: 'customers', component: CustomersListComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'customers/:id', component: CustomersFormComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'customers/0', component: CustomersFormComponent, canActivate: [IsAuthenticatedGuard] },

      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: '**', redirectTo: 'users', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
