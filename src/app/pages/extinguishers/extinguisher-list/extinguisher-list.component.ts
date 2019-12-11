import { Component, OnInit } from '@angular/core';
import { Extinguisher } from 'src/app/models/extinguisher';
import { ExtinguishersService } from '../extinguisher.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-extinguisher-list',
  templateUrl: './extinguisher-list.component.html',
  styleUrls: ['./extinguisher-list.component.css']
})
export class ExtinguisherListComponent implements OnInit {

  displayedColumns: string[] = ['code', 'customer', 'type', 'category', 'location', 'costCenter', 'address', 'factoryNo', 'bvNo', 'manufacturingDate', 'lastLoad', 'lastHydraulicTest', 'edit'];
  dataSource: Extinguisher[];

  constructor(
    private service: ExtinguishersService, 
    protected router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }
  
  loadData() : void {
    this.service.search()
      .then(list => {
        this.dataSource = list;
      })
      .catch(err => {
        console.error(JSON.stringify(err))
        this._snackBar.open("Error retrieving data! " + err, "Close", { duration: 3000 });
      })
  }

  edit(extType: any) : void {
    this.router.navigate(['/pages/extinguishers/'+extType.id]);
  }

  delete(extType: any) : void {
    this.service.delete(extType.id).subscribe(
      _ => {
        this._snackBar.open("Extinguisher deleted!", "Close", { duration: 3000 });
        this.loadData();
      },
      error => {
        this._snackBar.open("Error deleting Extinguisher!", "Close", { duration: 3000 });
      }
    )
  }

  create() : void {
    this.router.navigate(['/pages/extinguishers/0']);
  }

}
