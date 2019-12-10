import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatTableModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule, 
  MatButtonModule,
  MatSnackBarModule,
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomersFormComponent } from './customers-form/customers-form.component';
import { CustomersListComponent } from './customers-list/customers-list.component';

import { CustomersService } from './customers.service';

@NgModule({
  declarations: [
    CustomersFormComponent, 
    CustomersListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [CustomersService]
})
export class CustomersModule { }
