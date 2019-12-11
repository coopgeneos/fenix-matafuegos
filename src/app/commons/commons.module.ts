import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbdSortableHeader } from './directives/sortable.directive';
import { NgbdFilterableHeader } from './directives/filterable.directive';
import { CustomSelectComponent } from './custom-select/custom-select.component';

import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    CustomSelectComponent,
    NgbdSortableHeader,
    NgbdFilterableHeader
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [
    CustomSelectComponent
  ]
})
export class CommonsModule { }
