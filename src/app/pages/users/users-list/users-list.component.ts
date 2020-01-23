import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/pages/users/users.service';
import { Router } from '@angular/router';
import { CustomSnackService } from 'src/app/services/custom-snack.service';
import { MatDialog } from '@angular/material';
import { DeletePopupComponent } from 'src/app/commons/delete-popup/delete-popup.component';
import { Condition } from 'src/app/commons/directives/filterable.directive';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'username', 'role', 'edit'];
  dataSource: User[];

  constructor(
    private service: UsersService, 
    protected router: Router,
    private _snackBar: CustomSnackService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }
  
  loadData() : void {
    this.service.search()
      .then(list => {
        this.dataSource = list;
      })
      .catch(err => {
        console.error(JSON.stringify(err))
        this._snackBar.showError("Error obteniendo la información! " + err);
      })
  }

  edit(user: any) : void {
    this.router.navigate(['/pages/users/'+user.id]);
  }

  delete(user: any) : void {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result)
      if(result) {
        this.service.delete(user.id).subscribe(
          _ => {
            this._snackBar.showSuccess("Usuario eliminado!");
            this.loadData();
          },
          error => {
            this._snackBar.showError("Error eliminando el usuario!");
          }
        )
      }
    })
  }

  create() : void {
    this.router.navigate(['/pages/users/0']);
  }

}
