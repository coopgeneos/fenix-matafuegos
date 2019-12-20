import { Component, OnInit } from '@angular/core';
import { WorkOrder, WOrderState } from 'src/app/models/workOrder';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrdersService } from '../work-orders.service';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-work-order-made-form',
  templateUrl: './work-order-made-form.component.html',
  styleUrls: ['./work-order-made-form.component.css']
})
export class WorkOrderMadeFormComponent implements OnInit {

  id: number = 0;
  order: WorkOrder = new WorkOrder();

  madeList: any[] = [
    {name: 'Control y mantenimiento', todo: false, doit: false},
    {name: 'Carga completa', todo: false, doit: false},
    {name: 'Reemplazo de manómetro', todo: false, doit: false},
    {name: 'Reemplazo de válvula', todo: false, doit: false},
    {name: 'Reemplazo de manguera', todo: false, doit: false},
    {name: 'Prueba hidráulica', todo: false, doit: false},
    {name: 'Colocación de calco', todo: false, doit: false},
    {name: 'Cambio de zuncho', todo: false, doit: false}
  ];

  state: WOrderState;
  iNote: string;
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: WorkOrdersService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authSerive: AuthService) { 
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
            `Nro: ${data.invoiceNo}\nFecha: ${data.invoiceDate}\nNota: ${data.invoiceNote}` : 
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

          console.log(this.iNote)
        },
        error => {
          this._snackBar.open("Error fetching the order!", "Close", { duration: 2000 });
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
    order.doneBy.id = this.authSerive.getLoggedUser().id;
    order.doneDate = moment().format("YYYY-MM-DD")
    order.state = WOrderState.COMPLETANDOSE;

    //Borro los campos innecesarios para el update
    let fields = ['id','doneList','doneBy','doneDate','state'];
    for(let key in order) {
      if(fields.includes(key))
        continue
      delete order[key];
    }

    if(this.validate(order)) {
      this.service.update(this.id, order).subscribe(
        _ => {
          this._snackBar.open("Order saved!", "Close", { duration: 2000 });
          this.router.navigate(['/pages/workorders'])
        },
        error => {
          this._snackBar.open("Error updating order!" + error, "Close", { duration: 2000 });
        }
      )
    } else
    this._snackBar.open("Please check fields!","Close", { duration: 2000 });
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
