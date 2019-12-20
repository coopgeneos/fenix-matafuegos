import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/pages/users/users.service';
import { User, Role } from 'src/app/models/user';
import { CustomSnackService } from 'src/app/services/custom-snack.service';

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
  role: Role = Role.OPERARIO;
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: UsersService,
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
          this.name.setValue(data.name);
          this.username.setValue(data.username);
          this.role = data.role;
          this.password.setValue(data.password)
        },
        error => {
          this._snackBar.showError("Error obteniendo el usuario!");
        }
      )
    }
  }

  save() : void {
    let user = new User();
    this.name.value && this.name.value != "" ? user.name = this.name.value : delete user.name;
    this.username.value && this.username.value != "" ? user.username = this.username.value : delete user.username;
    this.role ? user.role = this.role : delete user.role;  
    this.password.value && this.password.value != "" ? user.password = this.password.value : delete user.password; 

    // console.log(user)

    if(this.validate()) {
      if(this.id == 0) {
        this.service.add(user).subscribe(
          _ => {
            this._snackBar.showSuccess("Usuario guardado!");
            this.router.navigate(['/pages/users'])
          },
          error => {
            this._snackBar.showError("Error al guardar el usuario!" + error);
          }
        )
      } else {
        this.service.update(this.id, user).subscribe(
          _ => {
            this._snackBar.showSuccess("Usuario guardado!");
            this.router.navigate(['/pages/users'])
          },
          error => {
            this._snackBar.showError("Error actualizando el usuario!" + error);
          }
        )
      }
    } else
    this._snackBar.showInfo("Por favor, revise los campos!");
  }

  cancel() : void {
    this.router.navigate(['/pages/users'])
  }

  validate() : boolean {
    let error = false
    if(this.id == 0) {
     error = this.password.hasError('required')
    }
    if(!(this.role == Role.ADMIN || this.role == Role.OPERARIO)) {
      error = false;
    }
    return error || !(this.name.hasError('required') 
      || this.username.hasError('required'))
  }

}
