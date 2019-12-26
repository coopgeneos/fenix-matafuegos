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

@Component({
  selector: 'app-work-order-made-form',
  templateUrl: './work-order-made-form.component.html',
  styleUrls: ['./work-order-made-form.component.css']
})
export class WorkOrderMadeFormComponent implements OnInit {

  id: number = 0;
  order: WorkOrder = new WorkOrder();

  madeList: any[] = ExtinguisherJobs.map(job => {
    return {name: job, value: false}
  })

  state: WOrderState;
  iNote: string;
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: WorkOrdersService,
    private _snackBar: CustomSnackService,
    private router: Router,
    private authService: AuthService) { 
    this.activatedRouter.params.subscribe(
      params => { 
        this.id = Number(params['id']); 
      }
    );
  }

  ngOnInit() {
    if(this.id != 0) {
      this.service.get(this.id).subscribe(
        data => {
          this.order = data;
          this.state = data.state;
          this.iNote = data.invoiceNote ? 
            `Nro Fact: ${data.invoiceNo}\nFecha: ${moment(data.invoiceDate).format('YYYY-MM-DD')}\nNota: ${data.invoiceNote}` : 
            null;

          let aux = data.doneList ? data.doneList.split(',') : [];
          for(let i=0; i<aux.length; i++) {
            for(let j=0; j<this.madeList.length; j++) {
              if(aux[i] == this.madeList[j].name) {
                this.madeList[j].doit = true;
                break;
              }
            }
          }

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

  }

  save() : void {
    let order = new WorkOrder();
    order.id = this.order.id;
    order.doneList = this.madeList
                      .filter(serv => {return serv.doit})
                      .map(serv => {return serv.name})
                      .toString();
    order.doneBy = new User();
    order.doneBy.id = this.authService.getLoggedUser().id;
    order.doneDate = moment().format("YYYY-MM-DD")
    order.state = WOrderState.COMPLETANDOSE;

    //Campos a actualizar
    let fields = ['doneList','doneBy','doneDate','state'];
    for(let key in order) {
      if(fields.includes(key))
        continue
      delete order[key];
    }

    if(this.validate(order)) {
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

  cancel() : void {
    this.router.navigate(['/pages/workorders'])
  }

  validate(order: WorkOrder) : boolean {
    return order.doneList && order.doneList != "";
  }

  addDoneService(i: number) {
    this.madeList[i].doit = !this.madeList[i].doit;
  }

}
