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

import { ExtinguisherTypeService } from './extinguisher-type.service';

import { ExtinguisherTypeListComponent } from './extinguisher-type-list/extinguisher-type-list.component';
import { ExtinguisherTypeFormComponent } from './extinguisher-type-form/extinguisher-type-form.component';
import { ExtinguisherFormComponent } from './extinguisher-form/extinguisher-form.component';
import { ExtinguisherListComponent } from './extinguisher-list/extinguisher-list.component';
import { ExtinguishersService } from './extinguisher.service';
import { CommonsModule } from 'src/app/commons/commons.module';

@NgModule({
  declarations: [
    ExtinguisherTypeListComponent, 
    ExtinguisherTypeFormComponent, 
    ExtinguisherFormComponent, 
    ExtinguisherListComponent
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
    MatPaginatorModule,
    CommonsModule
  ],
  providers: [
    ExtinguisherTypeService, 
    ExtinguishersService
  ]
})
export class ExtinguishersModule { }
