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
import { CommonsModule } from 'src/app/commons/commons.module';

import { WorkOrdersService } from './work-orders.service';

import { WorkOrderListComponent } from './work-order-list/work-order-list.component';
import { WorkOrderFormComponent } from './work-order-form/work-order-form.component';
import { WorkOrderMadeFormComponent } from './work-order-made-form/work-order-made-form.component';
import { CancelPopupComponent } from './cancel-popup/cancel-popup.component';
import { WorkOrderInvoiceListComponent } from './work-order-invoice-list/work-order-invoice-list.component';
import { InvoicePopupComponent } from './invoice-popup/invoice-popup.component';
import { ClosePopupComponent } from './close-popup/close-popup.component';

@NgModule({
  declarations: [
    WorkOrderListComponent,
    WorkOrderFormComponent,
    WorkOrderMadeFormComponent,
    CancelPopupComponent,
    WorkOrderInvoiceListComponent,
    InvoicePopupComponent,
    ClosePopupComponent
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
    FormsModule,
    CommonsModule
  ],
  providers: [WorkOrdersService],
  entryComponents: [ CancelPopupComponent, InvoicePopupComponent, ClosePopupComponent ],
})
export class WorkOrdersModule { }
