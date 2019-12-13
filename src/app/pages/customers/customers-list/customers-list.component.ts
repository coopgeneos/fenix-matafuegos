import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from '../customers.service';
import { Router } from '@angular/router';
import { MatSnackBar, PageEvent } from '@angular/material';
import { BaseListComponent } from 'src/app/commons/base-list-component';
import { Condition } from 'src/app/commons/directives/filterable.directive';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent extends BaseListComponent<Customer> implements OnInit {

  displayedColumns: string[] = ['code', 'name', 'address', 'phone', 'email', 'web', 'type', 'edit'];
  dataSource: Customer[];
  
  nameFilter: string = null;
  phoneFilter: string = null;
  emailFilter: string = null;

  constructor(
    public service: CustomersService, 
    protected router: Router,
    private _snackBar: MatSnackBar) { 
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
        this._snackBar.open("Error retrieving data! " + err, "Close", { duration: 3000 });
      })
  }

  create() : void {
    this.router.navigate(['/pages/customers/0']);
  }

  edit(user: any) : void {
    this.router.navigate(['/pages/customers/'+user.id]);
  }

  delete(user: any) : void {
    this.service.delete(user.id).subscribe(
      _ => {
        this._snackBar.open("Customer deleted!", "Close", { duration: 3000 });
        this.service.search();
      },
      error => {
        this._snackBar.open("Error deleting customer!", "Close", { duration: 3000 });
      }
    )
  }

  filter() : void {
    this.service.clearState();
    let filters = [];
    if(this.nameFilter && this.nameFilter != "")
      filters.push({column: 'name', condition: Condition.contains, value: this.nameFilter})
    if(this.phoneFilter && this.phoneFilter != "")
      filters.push({column: 'phone', condition: Condition.contains, value: this.phoneFilter})
    if(this.emailFilter && this.emailFilter != "")
      filters.push({column: 'email', condition: Condition.contains, value: this.emailFilter})     
    if(filters.length > 0)
      this.service.filters = filters;
    this.service.search()
  }

}
