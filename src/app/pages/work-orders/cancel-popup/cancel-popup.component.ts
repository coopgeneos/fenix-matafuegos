import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cancel-popup',
  templateUrl: './cancel-popup.component.html',
  styleUrls: ['./cancel-popup.component.css']
})
export class CancelPopupComponent  {

  text: string; 

  constructor(
    public ref: MatDialogRef<CancelPopupComponent>) { }

  abort() : void {
    this.ref.close(null);
  }

  cancel() : void {
    if(this.text)
      this.ref.close(this.text);
    else 
      this.abort();
  }
}
