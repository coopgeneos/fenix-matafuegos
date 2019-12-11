import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { IsAuthenticatedGuard } from '../guards/isAuthenticated.guard';
import { IsAdminGuard } from '../guards/isAdmin.guard';

import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomersFormComponent } from './customers/customers-form/customers-form.component';
import { ExtinguisherTypeListComponent } from './extinguishers/extinguisher-type-list/extinguisher-type-list.component';
import { ExtinguisherTypeFormComponent } from './extinguishers/extinguisher-type-form/extinguisher-type-form.component';
import { ExtinguisherListComponent } from './extinguishers/extinguisher-list/extinguisher-list.component';
import { ExtinguisherFormComponent } from './extinguishers/extinguisher-form/extinguisher-form.component';

const routes: Routes = [
  { path: '', component: PagesComponent,
    children: [
      { path: 'users', component: UsersListComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'users/:id', component: UsersFormComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'users/0', component: UsersFormComponent, canActivate: [IsAuthenticatedGuard] },

      { path: 'customers', component: CustomersListComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'customers/:id', component: CustomersFormComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'customers/0', component: CustomersFormComponent, canActivate: [IsAuthenticatedGuard] },

      { path: 'extinguisherstype', component: ExtinguisherTypeListComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'extinguisherstype/:id', component: ExtinguisherTypeFormComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'extinguisherstype/0', component: ExtinguisherTypeFormComponent, canActivate: [IsAuthenticatedGuard] },

      { path: 'extinguishers', component: ExtinguisherListComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'extinguishers/:id', component: ExtinguisherFormComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'extinguishers/0', component: ExtinguisherFormComponent, canActivate: [IsAuthenticatedGuard] },

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
