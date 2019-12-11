import { Component, OnInit } from '@angular/core';
import { ExtinguisherType } from 'src/app/models/extinguisherType';
import { ExtinguisherTypeService } from '../extinguisher-type.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-extinguisher-type-list',
  templateUrl: './extinguisher-type-list.component.html',
  styleUrls: ['./extinguisher-type-list.component.css']
})
export class ExtinguisherTypeListComponent implements OnInit {

  displayedColumns: string[] = ['code', 'category', 'loadExpiration', 'phExpiration', 'weight', 'volume', 'edit'];
  dataSource: ExtinguisherType[];

  constructor(
    private service: ExtinguisherTypeService, 
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
    this.router.navigate(['/pages/extinguisherstype/'+extType.id]);
  }

  delete(extType: any) : void {
    this.service.delete(extType.id).subscribe(
      _ => {
        this._snackBar.open("ExtinguisherType deleted!", "Close", { duration: 3000 });
        this.loadData();
      },
      error => {
        this._snackBar.open("Error deleting extinguisherType!", "Close", { duration: 3000 });
      }
    )
  }

  create() : void {
    this.router.navigate(['/pages/extinguisherstype/0']);
  }

}
