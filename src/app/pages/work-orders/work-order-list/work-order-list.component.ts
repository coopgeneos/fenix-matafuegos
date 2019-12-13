import { Component, OnInit } from '@angular/core';
import { WorkOrder } from 'src/app/models/workOrder';
import { WorkOrdersService } from '../work-orders.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import * as moment from 'moment';
import { CancelPopupComponent } from '../cancel-popup/cancel-popup.component';
import { BaseListComponent } from 'src/app/commons/base-list-component';

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent extends BaseListComponent<WorkOrder> implements OnInit {

  displayedColumns: string[] = ['orderNo', 'customer', 'extinguisher', 'closeBy', 'closeDate',  'edit'];
  dataSource: WorkOrder[];

  constructor(
    public service: WorkOrdersService, 
    protected router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    public dialog: MatDialog) { 
      super(service);
    }

  ngOnInit() {
    // this.loadData();
    this.service.clearState();
    this.service.search();
  }
  
  loadData() : void {
    this.service.search()
      .then(list => {
        this.dataSource = list;
      })
      .catch(err => {
        console.error(JSON.stringify(err))
        this._snackBar.open("Error retrieving data! " + err, "Close", { duration: 3000 });
      })
  }

  edit(order: any) : void {
    this.router.navigate(['/pages/workorders/'+order.id]);
  }

  delete(order: any) : void {
    this.service.delete(order.id).subscribe(
      _ => {
        this._snackBar.open("Order deleted!", "Close", { duration: 3000 });
        this.loadData();
      },
      error => {
        this._snackBar.open("Error deleting order!", "Close", { duration: 3000 });
      }
    )
  }

  create() : void {
    this.router.navigate(['/pages/workorders/0']);
  }

  update(order: any) : void {
    this.router.navigate(['/pages/workordersupdate/'+order.id]);
  }

  close(order: WorkOrder) : void {
    let _order = new WorkOrder();
    _order.id = order.id;
    _order.closeBy = new User();
    _order.closeBy.id = this.authService.getLoggedUser().id;
    _order.closeDate = moment().format("YYYY-MM-DD");

    delete _order.orderNo;
    delete _order.customer;
    delete _order.extinguisher;
    delete _order.services;
    delete _order.made;
    delete _order.madeBy; 
    delete _order.madeDate; 

    this.service.update(_order.id, _order).subscribe(
      _ => {
        this._snackBar.open("Order saved!", "Close", { duration: 2000 });
        this.loadData();
      },
      error => {
        this._snackBar.open("Error updating order!" + error, "Close", { duration: 2000 });
      }
    )
  }

  cancel(order: WorkOrder): void {
    const dialogRef = this.dialog.open(CancelPopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let _order = new WorkOrder();
        _order.canceled = result;
        _order.state = 'canceled'

        for(let key in _order) {
          if(key == 'canceled' || key == 'state')
            continue
          delete _order[key];
        }

        console.log(order.id, _order)

        this.service.update(order.id, _order).subscribe(
          _ => {
            this._snackBar.open("Order saved!", "Close", { duration: 2000 });
            this.loadData();
          },
          error => {
            this._snackBar.open("Error updating order!" + error, "Close", { duration: 2000 });
          }
        )
      }
    });
  }

}
