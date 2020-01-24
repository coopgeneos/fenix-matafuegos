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
import { ExtinguisherJobs } from '../const-data';
import { Condition, FilterEvent } from '../../../commons/directives/filterable.directive'

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

  _disabled: boolean = false;
  _force: boolean = false;
  extinguisherFilters: FilterEvent[] = [];

  servicesList: any[] = [];
  
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
          // this.orderNo.setValue(data.orderNo);
          this.customerId = data.customer.id.toString();
          this.extinguisherId = data.extinguisher.id.toString();
          this.userId = data.closeBy ? data.closeBy.id.toString() : null;
          this.services = data.toDoList;
          data.closeDate ? 
            this.closeDate.setValue(moment(data.closeDate).format("YYYY-MM-DD")) :
            this.closeDate.setValue(null);
          this.cancelNote = data.cancelNote ? data.cancelNote : null;
          this.state = data.state
          this._disabled = (this.state == 'CANCELADA' || this.state == 'FACTURADA'  || this.state == 'CERRADA');
          this.extinguisherFilters = [{column: "customer", condition: Condition["="], value: this.customerId}]
          this._force = true;
          
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

    this.service.getAllServices().subscribe(
      data => {
        this.servicesList = data.map(job => {
          return {name: job.name, value: false}
        })
      },
      error => {
        this._snackBar.showError("Error obteniendo los servicios!");
      }
    )

    /* this.userService.search()
      .then(list => {
        this.users = list;
      })
      .catch(err => {
        this._snackBar.showError("Error obteniendo los usuarios!");
      })

    this.customerService.clearState();
    this.customerService.filters = [{column: 'force', condition: Condition["="], value: true}]
    this.customerService.search()
      .then(list => {
        this.customers = list;
      })
      .catch(err => {
        this._snackBar.showError("Error obteniendo los clientes!");
      })

    this.extinguisherService.clearState();
    this.extinguisherService.filters = [{column: 'force', condition: Condition["="], value: true}]
    this.extinguisherService.search()
      .then(list => {
        this.extinguishers = list;
      })
      .catch(err => {
        this._snackBar.showError("Error obteniendo los matafuegos!");
      }) */
  }

  save() : void {
    let order = this.__prepareOrder();
    this.__save(order);
  }

  __prepareOrder() : WorkOrder {
    let order = new WorkOrder();
    // this.orderNo.value && this.orderNo.value != "" ? order.orderNo = this.orderNo.value : delete order.orderNo;
    
    // Preparo el Customer
    if(this.customerId) {
      order.customer = new Customer();
      order.customer.id = Number(this.customerId);
    } else 
      delete order.customer;
    
    // Preparo el matafuego
    if(this.extinguisherId) {
      order.extinguisher = new Extinguisher();
      order.extinguisher.id = Number(this.extinguisherId);
    } else 
      delete order.extinguisher;

    // Lista de servicios a hacerle al matafuego
    order.toDoList = this.servicesList
                      .filter(serv => {return serv.value})
                      .map(serv => {return serv.name})
                      .toString();

    //Borro los campos innecesarios. Solo dejo los que estan nombrados en el arreglo fields
    let fields = ['orderNo','customer','extinguisher','toDoList','state'];
    for(let key in order) {
      if(fields.includes(key))
        continue
      delete order[key];
    }

    return order;
  }

  __save(order: WorkOrder) : void {
    if(this.__validate(order)) {
      //Creo nueva orden
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
      } else { //Actualizo una orden existente
        order.state = WOrderState.COMPLETANDOSE;
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

  __validate(order: WorkOrder) : boolean {
    let error = false;
    return !error && 
      // (order.orderNo && order.orderNo != "") && 
      order.customer && 
      order.extinguisher && 
      (order.toDoList && order.toDoList != "")
  }

  checkService(i: number) {
    this.servicesList[i].value = !this.servicesList[i].value;
  }

  // loadExtinguishers() : void {
  //   this.extinguisherService.clearState();
  //   this.extinguisherService.filter = {column: "customer", value: this.customerId, condition: Condition["="]}
  //   this.extinguisherService.search()
  //     .then(list => {
  //       this.extinguishers = list;
  //     })
  //     .catch(err => {
  //       this._snackBar.showError("Error obteniendo los matafuegos!");
  //     })
  // }

  selectCustomer(id: any) : void {
    this.customerId = id;
    this.extinguisherFilters = [{column: "customer", condition: Condition["="], value: this.customerId}]
  }

  selectExtinguisher(id: any) : void {
    this.extinguisherId = id;
  }

}
