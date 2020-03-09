import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/commons/base-list-component';
import { WorkOrder } from 'src/app/models/workOrder';
import { WorkOrdersService } from '../work-orders.service';
import { Router } from '@angular/router';
import { CustomSnackService } from 'src/app/services/custom-snack.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-work-order-print-list',
  templateUrl: './work-order-print-list.component.html',
  styleUrls: ['./work-order-print-list.component.css']
})
export class WorkOrderPrintListComponent extends BaseListComponent<WorkOrder> implements OnInit {

  displayedColumns: string[] = ['selection',/* 'orderNo', */ 'customer', 'extinguisher', 'extinguisherCategory', 'costCenter', 'doneList'];
  dataSource: any[];

  constructor(
    public service: WorkOrdersService, 
    protected router: Router,
    private _snackBar: CustomSnackService,
    public dialog: MatDialog) {
      super(service);
    }

  ngOnInit() {
    this.loadData();
  }

  loadData() : void {
    this.service.ordersToPrint().subscribe(
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

  printOrders() : void {
    let selecteds = this.dataSource
                      .filter(elem => {return elem.selected});
    
    if(this.checkSelecteds(selecteds)) {
      let ids = selecteds.map(elem => {return elem.id});
      this.service.printOrders(ids).subscribe(
        data => {
          if(data.error) {
            throw data.message;
          }
          var blob = new Blob([data], {type: 'application/pdf'});
          const url= window.URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.href = url;
          link.download = 'file.pdf';
          link.dispatchEvent(new MouseEvent('click'));

          this.loadData();
        },
        error => {
          this._snackBar.showError("Falta configuración de DPS");
        }
      )

      
    }    
  }

  checkSelecteds(selecteds: any) : boolean {
    // Entre 1 y 3 seleccionados
    if(selecteds.length < 1 || selecteds.length > 3) {
      this._snackBar.showInfo("Seleccione al menos una orden y no mas de tres");
      return false;
    }

    // Todos deben ser del mismo tipo. Vehicular o Domiciliario
    if(selecteds.length > 1) {
      let type = selecteds[0]['extinguisherCategory'];
      for(let i=1; i<selecteds.length; i++){
        if(type != selecteds[i]['extinguisherCategory']) {
          this._snackBar.showInfo("Las órdenes no son de matafuegos de la misma categoría");
          return false;
        }
      }
    }

    return true;
  }

}
