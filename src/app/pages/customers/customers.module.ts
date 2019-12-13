import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatTableModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule, 
  MatButtonModule,
  MatSnackBarModule,
  MatSelectModule,
  MatPaginatorModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CustomersFormComponent } from './customers-form/customers-form.component';
import { CustomersListComponent } from './customers-list/customers-list.component';

import { CustomersService } from './customers.service';
import { CommonsModule } from 'src/app/commons/commons.module';

@NgModule({
  declarations: [
    CustomersFormComponent, 
    CustomersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    CommonsModule
  ],
  providers: [CustomersService]
})
export class CustomersModule { }
