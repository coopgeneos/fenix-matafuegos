import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/pages/users/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
        console.error(JSON.stringify(err))
        this._snackBar.open("Error retrieving data! " + err, "Close", { duration: 3000 });
      })
  }

  edit(user: any) : void {
    this.router.navigate(['/pages/users/'+user.id]);
  }

  delete(user: any) : void {
    this.service.delete(user.id).subscribe(
      _ => {
        this._snackBar.open("User deleted!", "Close", { duration: 3000 });
        this.loadData();
      },
      error => {
        this._snackBar.open("Error deleting user!", "Close", { duration: 3000 });
      }
    )
  }

  create() : void {
    this.router.navigate(['/pages/users/0']);
  }

}
