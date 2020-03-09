import { Component, OnInit } from '@angular/core';
import { WorkOrder, WOrderState } from 'src/app/models/workOrder';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrdersService } from '../work-orders.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth/auth.service';
import * as moment from 'moment';
import { ExtinguisherJobs } from '../const-data';
import { CustomSnackService } from 'src/app/services/custom-snack.service';
import { Extinguisher } from 'src/app/models/extinguisher';
import { ExtinguishersService } from '../../extinguishers/extinguisher.service';
import { MatDialog } from '@angular/material';
import { ClosePopupComponent } from '../close-popup/close-popup.component';

@Component({
  selector: 'app-work-order-made-form',
  templateUrl: './work-order-made-form.component.html',
  styleUrls: ['./work-order-made-form.component.css']
})
export class WorkOrderMadeFormComponent implements OnInit {

  id: number = 0;
  order: WorkOrder = new WorkOrder();

  madeList: any[] = [];

  state: WOrderState;
  iNote: string;
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: WorkOrdersService,
    private _snackBar: CustomSnackService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private extinguisherService: ExtinguishersService) { 
    this.activatedRouter.params.subscribe(
      params => { 
        this.id = Number(params['id']); 
      }
    );
  }

  ngOnInit() {
    this.service.getAllServices().subscribe(
      data => {
        this.madeList = data.map(job => {
          return {name: job.name, value: false}
        });

        if(this.id != 0) {
          this.service.get(this.id).subscribe(
            data => {
              this.order = data;
              this.state = data.state;
              this.iNote = data.invoiceNote ? 
                `Nro Fact: ${data.invoiceNo}\nFecha: ${moment(data.invoiceDate).format('YYYY-MM-DD')}\nNota: ${data.invoiceNote}` : 
                null;
    
              // Seteo el campo doIt de los objeto de la lista
              // Este campo indica si el trabajo esta hecho
              let aux = data.doneList ? data.doneList.split(',') : [];
              for(let i=0; i<aux.length; i++) {
                for(let j=0; j<this.madeList.length; j++) {
                  if(aux[i] == this.madeList[j].name) {
                    this.madeList[j].doit = true;
                    break;
                  }
                }
              }
    
              // Seteo el campo doIt de los objeto de la lista
              // Este campo indica si el trabajo esta para hacerse
              aux = data.toDoList ? data.toDoList.split(',') : [];
              for(let i=0; i<aux.length; i++) {
                for(let j=0; j<this.madeList.length; j++) {
                  if(aux[i] == this.madeList[j].name) {
                    this.madeList[j].todo = true;
                    break;
                  }
                }
              }
            },
            error => {
              this._snackBar.showError("Error obteniendo las ordenes!");
            }
          )
        }
      },
      error => {
        this._snackBar.showError("Error obteniendo los servicios!");
      }
    )

    

  }

  save() : void {
    let order = this.__prepareOrder()
    // order.state = WOrderState.COMPLETANDOSE;

    //Campos a actualizar. Solo se enviarán los campos de la lista
    let fields = ['doneList','doneBy','doneDate','state'];
    for(let key in order) {
      if(fields.includes(key))
        continue
      delete order[key];
    }

    this.__save(order);
  }

  cancel() : void {
    this.router.navigate(['/pages/workorders'])
  }

  addDoneService(i: number) {
    this.madeList[i].doit = !this.madeList[i].doit;
  }

  __validate(order: WorkOrder) : boolean {
    return order.doneList && order.doneList != "";
  }

  __prepareOrder() : WorkOrder {
    let order = new WorkOrder();
    order.id = this.order.id;
    // Lista de servicios realizados al matafuego
    order.doneList = this.madeList
                      .filter(serv => {return serv.doit})
                      .map(serv => {return serv.name})
                      .toString();
    // Realizado por ...
    order.doneBy = new User();
    order.doneBy.id = this.authService.getLoggedUser().id;
    order.doneDate = moment().format("YYYY-MM-DD")
    // order.state = WOrderState.COMPLETANDOSE;

    order.extinguisher = {...this.order.extinguisher};

    return order;
  }

  __save(order: WorkOrder) : void {
    if(this.__validate(order)) {
      this.service.update(this.id, order).subscribe(
        _ => {
          this._snackBar.showSuccess("Orden guardada!");
          this.router.navigate(['/pages/workorders'])
        },
        error => {
          this._snackBar.showError("Error actualizando la orden!" + error);
        }
      );
    } else
    this._snackBar.showInfo("Verifique los campos!");
  }

  saveAndClose() : void {
    const dialogRef = this.dialog.open(ClosePopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let _order = this.__prepareOrder();
        _order = this.__prepareCloseOrder(_order);

        // Lista de campos que se enviarán en el update
        let fields = ['id','closeBy','closeDate','state','doneList','doneBy','doneDate'];

        // Se eliminan los campos que no se van a actualizar
        for(let key in _order) {
          if(fields.includes(key))
            continue
          delete _order[key];
        }

        this.service.update(_order.id, _order).subscribe(
          _updated => {
            //Es necesario actualizar el matafuego?
            if(_order.doneList.includes('Carga completa') || _order.doneList.includes('Prueba hidráulica')) {
              let extinguisher = this.__prepareExtinguisher(_updated);
              this.extinguisherService.update(extinguisher.id, extinguisher).subscribe(
                _ => { 
                  this._snackBar.showSuccess("Orden y matafuegos guardados!");
                  this.router.navigate(['/pages/workorders']) 
                },
                error => {
                  this._snackBar.showError("Error actualizando las fechas del matafuego!");
                }
              )
            } else {
              this._snackBar.showSuccess("Orden guardada!");
              this.router.navigate(['/pages/workorders'])
            }           
          },
          error => {
            this._snackBar.showError("Error actualizando la orden!");
          }
        )
      }
    })
  }

  __prepareCloseOrder(order: WorkOrder) : WorkOrder {
    //Preparo los campos de "Cerrado por" y "Cerrado el"
    order.closeBy = new User();
    order.closeBy.id = this.authService.getLoggedUser().id;
    order.closeDate = moment().format("YYYY-MM-DD");
    order.state = WOrderState.CERRADA;

    return order;
  }

  __prepareExtinguisher(order: WorkOrder) : Extinguisher {
    let fields = ['id']; //Campos del matafuego a actualizar
    let extinguisher = new Extinguisher();
    extinguisher.id = order.extinguisher.id;

    //Actualizo la fecha de ultima carga ?
    if(order.doneList.includes('Carga completa')){
      extinguisher.lastLoad = moment().format("YYYY-MM-DD");
      fields.push('lastLoad');
    }

    //Actualizo la fecha de ultima prueba hidraulica ?
    if(order.doneList.includes('Prueba hidráulica')){
      extinguisher.lastHydraulicTest = moment().format("YYYY-MM-DD");
      fields.push('lastHydraulicTest');
    }
    
    //Campos del matafuego a actualizar
    for(let key in extinguisher) {
      if(fields.includes(key))
        continue
      delete extinguisher[key];
    }

    return extinguisher;    
  }
 
}
