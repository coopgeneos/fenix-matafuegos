import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackService {

  buttonText: string = "Cerrar";

  constructor(private _snackBar: MatSnackBar) { }

  showSuccess(msg: string) : void {
    this._snackBar.open(msg, this.buttonText, {
      duration: 3500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackSuccess']
    })
  }

  showError(msg: string) : void {
    this._snackBar.open(msg, this.buttonText, {
      duration: 3500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackError']
    })
  }
  
  showInfo(msg: string) : void {
    this._snackBar.open(msg, this.buttonText, {
      duration: 3500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackInfo']
    })
  }
}
