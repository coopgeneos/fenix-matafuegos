import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from '../customers.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  displayedColumns: string[] = ['code', 'name', 'address', 'phone', 'email', 'web', 'type', 'edit'];
  dataSource: Customer[];
  
  constructor(
    private service: CustomersService, 
    protected router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
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
        this.loadData();
      },
      error => {
        this._snackBar.open("Error deleting customer!", "Close", { duration: 3000 });
      }
    )
  }

}
