import { Component, OnInit } from '@angular/core';
import { ExtinguisherType } from 'src/app/models/extinguisherType';
import { ExtinguisherTypeService } from '../extinguisher-type.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CustomSnackService } from 'src/app/services/custom-snack.service';
import { DeletePopupComponent } from 'src/app/commons/delete-popup/delete-popup.component';

@Component({
  selector: 'app-extinguisher-type-list',
  templateUrl: './extinguisher-type-list.component.html',
  styleUrls: ['./extinguisher-type-list.component.css']
})
export class ExtinguisherTypeListComponent implements OnInit {

  displayedColumns: string[] = [/* 'code', */ 'category', 'loadExpiration', 'phExpiration', 'weight', 'volume', 'edit'];
  dataSource: ExtinguisherType[];

  constructor(
    private service: ExtinguisherTypeService, 
    protected router: Router,
    private _snackBar: CustomSnackService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }
  
  loadData() : void {
    this.service.clearState();
    this.service.search()
      .then(list => {
        this.dataSource = list;
      })
      .catch(err => {
        console.error(JSON.stringify(err))
        this._snackBar.showError("Error al obtener los datos! " + err,);
      })
  }

  edit(extType: any) : void {
    this.router.navigate(['/pages/extinguisherstype/'+extType.id]);
  }

  delete(extType: any) : void {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.delete(extType.id).subscribe(
          _ => {
            this._snackBar.showSuccess("Tipo de matafuego borrado!");
            this.loadData();
          },
          error => {
            this._snackBar.showError("Error borrando el tipo de matafuego!");
          }
        )
      }
    })
  }

  create() : void {
    this.router.navigate(['/pages/extinguisherstype/0']);
  }

}
