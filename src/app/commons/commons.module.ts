import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  MatSnackBarModule, 
  MatFormFieldModule,
  MatInputModule, 
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
} from '@angular/material';

import { NgbdSortableHeader } from './directives/sortable.directive';
import { NgbdFilterableHeader } from './directives/filterable.directive';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';

@NgModule({
  declarations: [
    CustomSelectComponent,
    NgbdSortableHeader,
    NgbdFilterableHeader,
    DeletePopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule, 
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CustomSelectComponent, DeletePopupComponent
  ]
})
export class CommonsModule { }
