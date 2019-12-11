import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/pages/users/users.service';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  
  id: number = 0;
  user: User;

  name = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  role: string = "operario";
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: UsersService,
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
          this.name.setValue(data.name);
          this.username.setValue(data.username);
          this.role = data.role;
          this.password.setValue(data.password)
        },
        error => {
          this._snackBar.open("Error fetching the user!", "Close", { duration: 2000 });
        }
      )
    }
  }

  save() : void {
    let user = new User();
    this.name.value && this.name.value != "" ? user.name = this.name.value : delete user.name;
    this.username.value && this.username.value != "" ? user.username = this.username.value : delete user.username;
    this.role && this.role != "" ? user.role = this.role : delete user.role;  
    this.password.value && this.password.value != "" ? user.password = this.password.value : delete user.password; 

    if(this.validate()) {
      if(this.id == 0) {
        this.service.add(user).subscribe(
          _ => {
            this._snackBar.open("User saved!", "Close", { duration: 2000 });
            this.router.navigate(['/pages/users'])
          },
          error => {
            this._snackBar.open("Error saving user! " + error, "Close", { duration: 2000 });
          }
        )
      } else {
        this.service.update(this.id, user).subscribe(
          _ => {
            this._snackBar.open("User saved!", "Close", { duration: 2000 });
            this.router.navigate(['/pages/users'])
          },
          error => {
            this._snackBar.open("Error updating user!" + error, "Close", { duration: 2000 });
          }
        )
      }
    } else
    this._snackBar.open("Please check fields!","Close", { duration: 2000 });
  }

  cancel() : void {
    this.router.navigate(['/pages/users'])
  }

  validate() : boolean {
    let error = false
    if(this.id == 0) {
     error = this.password.hasError('required')
    }
    if(!(this.role == "admin" || this.role == "operario")) {
      error = false;
    }
    return error || !(this.name.hasError('required') 
      || this.username.hasError('required'))
  }

}
