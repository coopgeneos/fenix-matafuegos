import { Component, OnInit } from '@angular/core';
import { WorkOrder, WOrderState } from 'src/app/models/workOrder';
import { WorkOrdersService } from '../work-orders.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import * as moment from 'moment';
import { CancelPopupComponent } from '../cancel-popup/cancel-popup.component';
import { BaseListComponent } from 'src/app/commons/base-list-component';
import { CustomSnackService } from 'src/app/services/custom-snack.service';
import { ClosePopupComponent } from '../close-popup/close-popup.component';
import { ExtinguishersService } from '../../extinguishers/extinguisher.service';
import { CustomersService } from '../../customers/customers.service';
import { Condition } from 'src/app/commons/directives/filterable.directive';
import { DeletePopupComponent } from 'src/app/commons/delete-popup/delete-popup.component';

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent extends BaseListComponent<WorkOrder> implements OnInit {

  displayedColumns: string[] = [/* 'orderNo', */ 'customer', 'extinguisher', 'closeBy', 'closeDate', 'state', 'edit'];
  dataSource: WorkOrder[];

  states: string[] = [];

  //Filters
  codeFilter: string = null;
  customerFilter: number;
  extinguisherFilter: number;
  stateFilter: string = null;
  cleanFilters: boolean = false;

  isAdmin: boolean = false;

  constructor(
    public service: WorkOrdersService, 
    protected router: Router,
    private _snackBar: CustomSnackService,
    private authService: AuthService,
    public dialog: MatDialog,
    public extinguisherService: ExtinguishersService,
    public customerService: CustomersService) { 
      super(service);
    }

  ngOnInit() {
    // this.loadData();
    this.authService.isAdmin().subscribe(
      resp => {
        this.isAdmin = resp;
      },
      error => {
        this._snackBar.showError("Error obteniendo los permisos")
      }
    )
    this.service.clearState();
    this.service.search();
    this.states = Object.keys(WOrderState);
  }
  
  loadData() : void {
    this.service.search()
      .then(list => {
        this.dataSource = list;
      })
      .catch(err => {
        console.error(JSON.stringify(err))
        this._snackBar.showError("Error obteniendo la información! " + JSON.stringify(err));
      })
  }

  edit(order: any) : void {
    this.router.navigate(['/pages/workorders/'+order.id]);
  }

  delete(order: any) : void {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.delete(order.id).subscribe(
          _ => {
            this._snackBar.showSuccess("Orden borrada!");
            this.loadData();
          },
          error => {
            this._snackBar.showError("Error borrando la orden!");
          }
        )
      }
    })
    
  }

  create() : void {
    this.router.navigate(['/pages/workorders/0']);
  }

  update(order: any) : void {
    this.router.navigate(['/pages/workordersupdate/'+order.id]);
  }

  close(order: WorkOrder) : void {
    const dialogRef = this.dialog.open(ClosePopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let _order = new WorkOrder();
        _order.id = order.id;
        _order.closeBy = new User();
        _order.closeBy.id = this.authService.getLoggedUser().id;
        _order.closeDate = moment().format("YYYY-MM-DD");
        _order.state = WOrderState.CERRADA;

        //Borro los campos innecesarios para el update
        let fields = ['id','closeBy','closeDate','state'];
        for(let key in _order) {
          if(fields.includes(key))
            continue
          delete _order[key];
        }

        this.service.update(_order.id, _order).subscribe(
          _ => {
            this._snackBar.showSuccess("Orden guardada!");
            this.loadData();
          },
          error => {
            this._snackBar.showError("Error actualizando la orden!" + error);
          }
        )

        //Es necesario actualizar el matafuego?
        fields = ['id'];
        let upd_ext = false;
        let ext = order.extinguisher;
        if(order.doneList.includes('Carga completa')){
          ext.lastLoad = moment().format("YYYY-MM-DD");
          upd_ext = true;
          fields.push('lastLoad');
        }
        if(order.doneList.includes('Prueba hidráulica')){
          ext.lastHydraulicTest = moment().format("YYYY-MM-DD");
          upd_ext = true;
          fields.push('lastHydraulicTest');
        }
        if(upd_ext) {
          //Campos del matafuego a actualizar
          for(let key in ext) {
            if(fields.includes(key))
              continue
            delete ext[key];
          }
          this.extinguisherService.update(ext.id, ext).subscribe(
            _ => {},
            error => {
              this._snackBar.showError("Error actualizando las fechas del matafuego!");
            }
          )
        }
      }
    })
  }

  cancel(order: WorkOrder): void {
    const dialogRef = this.dialog.open(CancelPopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let _order = new WorkOrder();
        _order.cancelNote = result;
        _order.state = WOrderState.CANCELADA

        for(let key in _order) {
          if(key == 'cancelNote' || key == 'state')
            continue
          delete _order[key];
        }

        this.service.update(order.id, _order).subscribe(
          _ => {
            this._snackBar.showSuccess("Orden guardada!");
            this.loadData();
          },
          error => {
            this._snackBar.showError("Error actualizando la orden!" + error);
          }
        )
      }
    });
  }

  filter() : void {
    this.service.clearState();
    let filters = [];
    // if(this.codeFilter && this.codeFilter != "")
    //   filters.push({column: 'orderNo', condition: Condition["="], value: this.codeFilter}) 
    if(this.customerFilter)
      filters.push({column: 'customer', condition: Condition["="], value: this.customerFilter}) 
    if(this.extinguisherFilter && this.extinguisherFilter > 0)
      filters.push({column: 'extinguisher', condition: Condition["="], value: this.extinguisherFilter}) 
    if(this.stateFilter && this.stateFilter != "")
      filters.push({column: 'state', condition: Condition["="], value: this.stateFilter}) 
    if(filters.length > 0) {
      this.service.filters = filters;
    }
    this.service.search()
  }

  cleanFilter() : void {
    this.customerFilter = null;
    this.extinguisherFilter = null;
    this.stateFilter = null;
    this.cleanFilters = true;
  }

  selectCustomer(id: any) : void {
    this.cleanFilters = false;
    this.customerFilter = (!id || id == 'null') ? null : id;
    this.extinguisherFilter = null;
    this.extinguisherService.clearState();
    if(this.customerFilter){
      this.extinguisherService.filters = [{column: 'customer', condition: Condition["="], value: id}];
    }
    this.extinguisherService.search();
  }

  selectExtinguisher(id: any) : void {
    this.cleanFilters = false;
    this.extinguisherFilter = (!id || id == 'null') ? null : id;
  }

}
