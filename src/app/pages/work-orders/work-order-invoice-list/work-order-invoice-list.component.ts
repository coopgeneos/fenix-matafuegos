import { Component, OnInit } from '@angular/core';
import { WorkOrdersService } from '../work-orders.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { BaseListComponent } from 'src/app/commons/base-list-component';
import { WorkOrder } from 'src/app/models/workOrder';
import { InvoicePopupComponent } from '../invoice-popup/invoice-popup.component';
import { CustomSnackService } from 'src/app/services/custom-snack.service';

@Component({
  selector: 'app-work-order-invoice-list',
  templateUrl: './work-order-invoice-list.component.html',
  styleUrls: ['./work-order-invoice-list.component.css']
})
export class WorkOrderInvoiceListComponent implements OnInit {

  displayedColumns: string[] = ['selection','orderNo', 'customer', 'extinguisher', 'costCenter', 'doneList'];
  dataSource: any[];

  constructor(
    public service: WorkOrdersService, 
    protected router: Router,
    private _snackBar: CustomSnackService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() : void {
    this.service.ordersToInvoice().subscribe(
      list => {
        this.dataSource = list.map(wo => {
          wo['selected'] = false;
          return wo;
        });
      },
      error => {
        this._snackBar.showError("Error obteniendo las órdenes!");
      }
    )
  }

  selectOrder(elem: any) : void {
    elem.selected = !elem.selected;
  }

  invoiceOrders() : void {
    let ids = this.dataSource
                    .filter(elem => {return elem.selected})
                    .map(elem => {return elem.id});
    if(ids.length < 1) {
      this._snackBar.showInfo("Seleccione al menos una orden");
      return;
    }
    const dialogRef = this.dialog.open(InvoicePopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.invoiceOrders(ids, result.invoiceNo, result.invoiceDate, result.invoiceNote).subscribe(
          _ => {
            this.loadData();
          },
          error => {
            console.error(JSON.stringify(error))
            this._snackBar.showError("Error "+JSON.stringify(error));
          }
        )
      }
    });
    
  }

}
