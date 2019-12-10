import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-idle-user',
  templateUrl: './idle-user.component.html',
  styleUrls: ['./idle-user.component.css']
})
export class IdleUserComponent implements OnInit {

  time: number = 30; // 30 secs to close session automatically

  constructor(public ref: MatDialogRef<IdleUserComponent>) { }

  ngOnInit() {
    setTimeout(() => {this.ref.close(false)}, this.time * 1000)
  }

  continue() : void {
    this.ref.close(true);
  }

}
