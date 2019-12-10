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

import { UserService } from './user.service';

import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UserFormComponent
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
  providers: [UserService]
})
export class UsersModule { }
