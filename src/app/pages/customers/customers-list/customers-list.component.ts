import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from '../customers.service';
import { Router } from '@angular/router';
import { MatSnackBar, PageEvent, MatDialog } from '@angular/material';
import { BaseListComponent } from 'src/app/commons/base-list-component';
import { Condition } from 'src/app/commons/directives/filterable.directive';
import { CustomSnackService } from 'src/app/services/custom-snack.service';
import { DeletePopupComponent } from 'src/app/commons/delete-popup/delete-popup.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent extends BaseListComponent<Customer> implements OnInit {

  displayedColumns: string[] = [/* 'code',  */'name', 'address', 'phone', 'email', 'web', 'type', 'edit'];
  dataSource: Customer[];
  
  nameFilter: string = null;
  phoneFilter: string = null;
  emailFilter: string = null;

  constructor(
    public service: CustomersService, 
    protected router: Router,
    private _snackBar: CustomSnackService,
    public dialog: MatDialog) { 
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
        this._snackBar.showError("Error obteniendo los clientes! " + err);
      })
  }

  create() : void {
    this.router.navigate(['/pages/customers/0']);
  }

  edit(user: any) : void {
    this.router.navigate(['/pages/customers/'+user.id]);
  }

  delete(user: any) : void {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.delete(user.id).subscribe(
          _ => {
            this._snackBar.showSuccess("Cliente eliminado!");
            this.service.search();
          },
          error => {
            this._snackBar.showError("Error eliminando el cliente!");
          }
        )
      }
    })
    
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

  cleanFilter() : void {
    this.phoneFilter = null;
    this.emailFilter = null;
    this.nameFilter = null;
  }

}
