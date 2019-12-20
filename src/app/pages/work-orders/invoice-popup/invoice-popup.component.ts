import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invoice-popup',
  templateUrl: './invoice-popup.component.html',
  styleUrls: ['./invoice-popup.component.css']
})
export class InvoicePopupComponent {

  invoiceNo: string;
  date: Date;
  note: string;

  error: boolean = false;
  msg: string;

  constructor(public ref: MatDialogRef<InvoicePopupComponent>) { }

  save() : void {
    if(!this.validate()) {
      this.error = true;
      this.msg = "Revise los campos cargados"
    } else {
      this.ref.close({
        invoiceNo: this.invoiceNo,
        invoiceDate: this.date,
        invoiceNote: this.note
      })
    }
  }

  cancel() : void {
    this.ref.close(null)
  }

  validate() : boolean {
    if(!this.invoiceNo || this.invoiceNo.length < 1 || 
        !this.date || !this.note || this.note.length < 1)
        return false;
    return true;
  }

}
