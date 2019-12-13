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
  MatCheckboxModule,
  MatListModule,
  MatDialogModule,
  MatPaginatorModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { WorkOrdersService } from './work-orders.service';

import { WorkOrderListComponent } from './work-order-list/work-order-list.component';
import { WorkOrderFormComponent } from './work-order-form/work-order-form.component';
import { WorkOrderMadeFormComponent } from './work-order-made-form/work-order-made-form.component';
import { CancelPopupComponent } from './cancel-popup/cancel-popup.component';

@NgModule({
  declarations: [
    WorkOrderListComponent,
    WorkOrderFormComponent,
    WorkOrderMadeFormComponent,
    CancelPopupComponent
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
    MatCheckboxModule,
    MatListModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule
  ],
  providers: [WorkOrdersService],
  entryComponents: [ CancelPopupComponent ],
})
export class WorkOrdersModule { }
