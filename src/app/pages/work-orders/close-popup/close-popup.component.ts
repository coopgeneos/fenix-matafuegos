import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-close-popup',
  templateUrl: './close-popup.component.html',
  styleUrls: ['./close-popup.component.css']
})
export class ClosePopupComponent {

  constructor(public ref: MatDialogRef<ClosePopupComponent>) { }

  cancel() : void {
    this.ref.close(null);
  }

  ok() : void {
    this.ref.close(true);
  }

}
