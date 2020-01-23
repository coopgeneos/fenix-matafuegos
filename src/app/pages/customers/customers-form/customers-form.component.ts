import { Component, OnInit } from '@angular/core';
import { Customer, CustomerType } from 'src/app/models/customer';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { CustomSnackService } from 'src/app/services/custom-snack.service';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {
  
  id: number = 0;
  customer: Customer;

  code = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  web = new FormControl('', [Validators.required]);
  type: CustomerType = CustomerType.EMPRESA;

  types = () => {
    return Object.keys(CustomerType)
  }

  constructor(
    private activatedRouter: ActivatedRoute,
    private service: CustomersService,
    private _snackBar: CustomSnackService,
    private router: Router) { 
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
          // this.code.setValue(data.code);
          this.name.setValue(data.name);
          this.address.setValue(data.address);
          this.phone.setValue(data.phone);
          this.email.setValue(data.email);
          this.web.setValue(data.web);
          this.type = CustomerType[data.type]
        },
        error => {
          this._snackBar.showError("Error obteniendo el cliente!");
        }
      )
    }
  }

  save() : void {
    let customer = new Customer();
    // this.code.value && this.code.value != "" ? customer.code = this.code.value : delete customer.code;
    this.name.value && this.name.value != "" ? customer.name = this.name.value : delete customer.name;
    this.address.value && this.address.value != "" ? customer.address = this.address.value : delete customer.address;
    this.phone.value && this.phone.value != "" ? customer.phone = this.phone.value : delete customer.phone;
    this.email.value && this.email.value != "" ? customer.email = this.email.value : delete customer.email;
    this.web.value && this.web.value != "" ? customer.web = this.web.value : delete customer.web;
    this.type ? customer.type = CustomerType[this.type] : delete customer.type; 
        
    if(this.validate()) {
      if(this.id == 0) {
        this.service.add(customer).subscribe(
          _ => {
            this._snackBar.showSuccess("Cliente guardado!");
            this.router.navigate(['/pages/customers'])
          },
          error => {
            this._snackBar.showError("Error guardando el cliente");
          }
        )
      } else {
        this.service.update(this.id, customer).subscribe(
          _ => {
            this._snackBar.showSuccess("Cliente guardado!");
            this.router.navigate(['/pages/customers'])
          },
          error => {
            this._snackBar.showError("Error actualizando el cliente!" + error);
          }
        )
      }
    } else
    this._snackBar.showInfo("Verifique los campos!");
  }

  cancel() : void {
    this.router.navigate(['/pages/customers'])
  }

  validate() : boolean {
    let error = false
    if(!(this.type == CustomerType.EMPRESA || this.type == CustomerType.PARTICULAR)) {
      error = true;
    }
    return !(error || 
      // this.code.hasError('required') || 
      this.name.hasError('required') || 
      this.address.hasError('required') || 
      this.phone.hasError('required') || 
      this.email.hasError('required') 
    )
  }

}
