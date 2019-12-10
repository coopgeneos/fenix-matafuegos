import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  rePasswordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar) { }

  signup() : void {
    if(!this.validate()) {
      this._snackBar.open("Error on fields!", "Close", { duration: 2000 });
      return;
    } 
    if(this.passwordFormControl.value != this.rePasswordFormControl.value) {
      this._snackBar.open("Passwords are differents!", "Close", { duration: 2000 });
      return;
    }
      
    this.authService.signUp(null)
    
  }

  validate() : boolean {
    return !(this.emailFormControl.hasError('email') 
      || this.emailFormControl.hasError('required') 
      || this.passwordFormControl.hasError('required')
      || this.rePasswordFormControl.hasError('required'))
  }

}
