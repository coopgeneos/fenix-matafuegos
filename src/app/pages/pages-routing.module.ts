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
import { WorkOrderListComponent } from './work-orders/work-order-list/work-order-list.component';
import { WorkOrderFormComponent } from './work-orders/work-order-form/work-order-form.component';
import { WorkOrderMadeFormComponent } from './work-orders/work-order-made-form/work-order-made-form.component';

const routes: Routes = [
  { path: '', component: PagesComponent,
    children: [
      { path: 'users', component: UsersListComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },
      { path: 'users/:id', component: UsersFormComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },
      { path: 'users/0', component: UsersFormComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },

      { path: 'customers', component: CustomersListComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },
      { path: 'customers/:id', component: CustomersFormComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },
      { path: 'customers/0', component: CustomersFormComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },

      { path: 'extinguisherstype', component: ExtinguisherTypeListComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },
      { path: 'extinguisherstype/:id', component: ExtinguisherTypeFormComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },
      { path: 'extinguisherstype/0', component: ExtinguisherTypeFormComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },

      { path: 'extinguishers', component: ExtinguisherListComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },
      { path: 'extinguishers/:id', component: ExtinguisherFormComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },
      { path: 'extinguishers/0', component: ExtinguisherFormComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },

      { path: 'workorders', component: WorkOrderListComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'workorders/:id', component: WorkOrderFormComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'workorders/0', component: WorkOrderFormComponent, canActivate: [IsAuthenticatedGuard] },
      { path: 'workordersupdate/:id', component: WorkOrderMadeFormComponent, canActivate: [IsAuthenticatedGuard] },
      
      { path: '', redirectTo: 'workorders', pathMatch: 'full' },
      { path: '**', redirectTo: 'workorders', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
