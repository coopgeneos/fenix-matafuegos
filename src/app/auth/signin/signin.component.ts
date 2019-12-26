import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserIdleService } from 'angular-user-idle';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { IdleUserComponent } from '../idle-user/idle-user.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private userIdle: UserIdleService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    // Preparacion del tiempo de inactividad: 600 segs (10 mins) de inactividad y se dipara 
    // el popup advirtiendo que se cerrará la session.
    // Una vez mostrado el popup tiene 30 segundos para estirar la session o se cerrará
    this.userIdle.setConfigValues({idle: 600, timeout: 30, ping: 0})
    this.userIdle.onTimerStart().subscribe(
      time => {
        if(time == 1) {
          const dialogRef = this.dialog.open(IdleUserComponent, {
            width: '250px',
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if(result && result == true) {
              this.userIdle.resetTimer();
            } else {
              this.userIdle.stopTimer();
              this.userIdle.stopWatching();
              this.authService.signOut().subscribe();  
              this.authService.clearSession()
            }
          });
        }
      }
    );
  }

  signIn() : void {
    if(!this.validate()) {
      this._snackBar.open("Bad credentials!", "Close", {
        duration: 3500,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['snackError']
      });
    } else {
      let credentials = {
        username: this.usernameFormControl.value, 
        password: this.passwordFormControl.value
      };
      this.authService.signIn(credentials).subscribe(
        logged => {
          if(logged.error)
            this._snackBar.open(logged.message, "Close", {
              duration: 3500,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['snackError']
            });
          else {
            this.userIdle.startWatching();
            this.authService.setSession(logged.user);
            this.router.navigate(['/'])
          }
        },
        error => {
          this._snackBar.open(error, "Close", {
            duration: 3500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackError']
          });
        }
      )
    }
  }

  validate() : boolean {
    return !(this.usernameFormControl.hasError('required') 
      || this.passwordFormControl.hasError('required'))
  }

}
