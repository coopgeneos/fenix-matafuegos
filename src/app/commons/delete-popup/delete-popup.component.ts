import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent {

  constructor(public ref: MatDialogRef<DeletePopupComponent>) { }

  cancel() : void {
    this.ref.close(null);
  }

  ok() : void {
    this.ref.close(true);
  }
}
