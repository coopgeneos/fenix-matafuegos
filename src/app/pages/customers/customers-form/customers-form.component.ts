import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { MatSnackBar } from '@angular/material';

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
  type: string = "empresa";

  constructor(
    private activatedRouter: ActivatedRoute,
    private service: CustomersService,
    private _snackBar: MatSnackBar,
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
          this.code.setValue(data.code);
          this.name.setValue(data.name);
          this.address.setValue(data.address);
          this.phone.setValue(data.phone);
          this.email.setValue(data.email);
          this.web.setValue(data.web);
          this.type = data.type
        },
        error => {
          this._snackBar.open("Error fetching the customer!", "Close", { duration: 2000 });
        }
      )
    }
  }

  save() : void {
    let customer = new Customer();
    this.code.value && this.code.value != "" ? customer.code = this.code.value : delete customer.code;
    this.name.value && this.name.value != "" ? customer.name = this.name.value : delete customer.name;
    this.address.value && this.address.value != "" ? customer.address = this.address.value : delete customer.address;
    this.phone.value && this.phone.value != "" ? customer.phone = this.phone.value : delete customer.phone;
    this.email.value && this.email.value != "" ? customer.email = this.email.value : delete customer.email;
    this.web.value && this.web.value != "" ? customer.web = this.web.value : delete customer.web;
    this.type && this.type != "" ? customer.type = this.type : delete customer.type;  
    
    if(this.validate()) {
      if(this.id == 0) {
        this.service.add(customer).subscribe(
          _ => {
            this._snackBar.open("Customer saved!", "Close", { duration: 2000 });
            this.router.navigate(['/pages/customers'])
          },
          error => {
            this._snackBar.open("Error saving customer! " + error, "Close", { duration: 2000 });
          }
        )
      } else {
        this.service.update(this.id, customer).subscribe(
          _ => {
            this._snackBar.open("Customer saved!", "Close", { duration: 2000 });
            this.router.navigate(['/pages/customers'])
          },
          error => {
            this._snackBar.open("Error updating customer!" + error, "Close", { duration: 2000 });
          }
        )
      }
    } else
    this._snackBar.open("Please check fields!","Close", { duration: 2000 });
  }

  cancel() : void {
    this.router.navigate(['/pages/customers'])
  }

  validate() : boolean {
    let error = false
    if(!(this.type == "empresa" || this.type == "vehicular")) {
      error = false;
    }
    return error || !(
      this.code.hasError('required') || 
      this.name.hasError('required') || 
      this.address.hasError('required') || 
      this.phone.hasError('required') || 
      this.email.hasError('required') || 
      this.web.hasError('required')
    )
  }

}
