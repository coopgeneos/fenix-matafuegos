import { Component, OnInit } from '@angular/core';
import { WorkOrder, WOrderState } from 'src/app/models/workOrder';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrdersService } from '../work-orders.service';
import { MatSnackBar } from '@angular/material';
import { Customer } from 'src/app/models/customer';
import { Extinguisher } from 'src/app/models/extinguisher';
import { User } from 'src/app/models/user';
import * as moment from 'moment';
import { UsersService } from '../../users/users.service';
import { CustomersService } from '../../customers/customers.service';
import { ExtinguishersService } from '../../extinguishers/extinguisher.service';
import { CustomSnackService } from 'src/app/services/custom-snack.service';

@Component({
  selector: 'app-work-order-form',
  templateUrl: './work-order-form.component.html',
  styleUrls: ['./work-order-form.component.css']
})
export class WorkOrderFormComponent implements OnInit {

  id: number = 0;
  order: WorkOrder;

  orderNo = new FormControl('', [Validators.required]);
  customerId: string = null;
  extinguisherId: string = null;
  services: string = "";
  userId: string = null;
  closeDate = new FormControl('', [Validators.required]);
  cancelNote: string = null;
  state: WOrderState = WOrderState.CREADA;

  customers: Customer[];
  extinguishers: Extinguisher[];
  users: User[];

  servicesList: any[] = [
    {name: 'Control y mantenimiento', value: false},
    {name: 'Carga completa', value: false},
    {name: 'Reemplazo de manómetro', value: false},
    {name: 'Reemplazo de válvula', value: false},
    {name: 'Reemplazo de manguera', value: false},
    {name: 'Prueba hidráulica', value: false},
    {name: 'Colocación de calco', value: false},
    {name: 'Cambio de zuncho', value: false}
  ]
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: WorkOrdersService,
    private _snackBar: CustomSnackService,
    private router: Router,
    private userService: UsersService,
    private customerService: CustomersService,
    private extinguisherService: ExtinguishersService) { 
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
          this.orderNo.setValue(data.orderNo);
          this.customerId = data.customer.id.toString();
          this.extinguisherId = data.extinguisher.id.toString();
          this.userId = data.closeBy ? data.closeBy.id.toString() : null;
          this.services = data.toDoList;
          data.closeDate ? 
            this.closeDate.setValue(moment(data.closeDate).format("YYYY-MM-DD")) :
            this.closeDate.setValue(null);
          this.cancelNote = data.cancelNote ? data.cancelNote : null;
          
          this.state = data.state
          
          let aux = this.services.split(',');
          for(let i=0; i<aux.length; i++) {
            for(let j=0; j<this.servicesList.length; j++) {
              if(aux[i] == this.servicesList[j].name) {
                this.servicesList[j].value = true;
                break;
              }
            }
          }
        },
        error => {
          this._snackBar.showError("Error obteniendo las órdenes!");
        }
      )
    }

    this.userService.search()
      .then(list => {
        this.users = list;
      })
      .catch(err => {
        this._snackBar.showError("Error obteniendo los usuarios!");
      })

    this.customerService.search()
      .then(list => {
        this.customers = list;
      })
      .catch(err => {
        this._snackBar.showError("Error obteniendo los clientes!");
      })

    this.extinguisherService.search()
      .then(list => {
        this.extinguishers = list;
      })
      .catch(err => {
        this._snackBar.showError("Error obteniendo los matafuegos!");
      })
  }

  save() : void {
    let order = new WorkOrder();
    this.orderNo.value && this.orderNo.value != "" ? order.orderNo = this.orderNo.value : delete order.orderNo;
    
    if(this.customerId) {
      order.customer = new Customer();
      order.customer.id = Number(this.customerId);
    } else 
      delete order.customer;
      
    if(this.extinguisherId) {
      order.extinguisher = new Extinguisher();
      order.extinguisher.id = Number(this.extinguisherId);
    } else 
      delete order.extinguisher;

    order.toDoList = this.servicesList
                      .filter(serv => {return serv.value})
                      .map(serv => {return serv.name})
                      .toString();

    //Borro los campos innecesarios
    let fields = ['orderNo','customer','extinguisher','toDoList','state'];
    for(let key in order) {
      if(fields.includes(key))
        continue
      delete order[key];
    }

    console.log(order);

    if(this.validate(order)) {
      if(this.id == 0) {
        order.state = WOrderState.CREADA;
        this.service.add(order).subscribe(
          _ => {
            this._snackBar.showSuccess("Orden guardada!");
            this.router.navigate(['/pages/workorders'])
          },
          error => {
            this._snackBar.showError("Error guardando la orden! " + error);
          }
        )
      } else {
        /* if(this.canceled) {
          order.state = WOrderState.CANCELED;
          order.cancellingNote = this.canceled;
        } */
        this.service.update(this.id, order).subscribe(
          _ => {
            this._snackBar.showSuccess("Orden guardada!");
            this.router.navigate(['/pages/workorders'])
          },
          error => {
            this._snackBar.showError("Error actualizando la orden! " + error);
          }
        )
      }
    } else
    this._snackBar.showInfo("Verifique los campos!");
  }

  cancel() : void {
    this.router.navigate(['/pages/workorders'])
  }

  validate(order: WorkOrder) : boolean {
    let error = false;
    return !error && 
      (order.orderNo && order.orderNo != "") && 
      order.customer && 
      order.extinguisher && 
      (order.toDoList && order.toDoList != "")
  }

  checkService(i: number) {
    this.servicesList[i].value = !this.servicesList[i].value;
  }

}
