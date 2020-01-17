import { Component, OnInit } from '@angular/core';
import { Extinguisher } from 'src/app/models/extinguisher';
import { ExtinguishersService } from '../extinguisher.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BaseListComponent } from 'src/app/commons/base-list-component';
import { CustomersService } from '../../customers/customers.service';
import { Condition } from 'src/app/commons/directives/filterable.directive';
import { CustomSnackService } from 'src/app/services/custom-snack.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-extinguisher-list',
  templateUrl: './extinguisher-list.component.html',
  styleUrls: ['./extinguisher-list.component.css']
})
export class ExtinguisherListComponent extends BaseListComponent<Extinguisher> implements OnInit {

  displayedColumns: string[] = ['code', 'customer', 'type', 'category', 'location', 'costCenter', 'address', 'factoryNo', 'bvNo', 'manufacturingDate', 'lastLoad', 'lastHydraulicTest', 'edit'];
  dataSource: Extinguisher[];

  //Filters
  codeFilter: string = null;
  customerFilter: number;

  constructor(
    public service: ExtinguishersService, 
    protected router: Router,
    private _snackBar: CustomSnackService,
    private customerService: CustomersService) { 
      super(service)
    }

  ngOnInit() {
    // this.loadData();
    this.service.clearState();
    this.service.search()
  }
  
  loadData() : void {
    this.service.search()
      .then(list => {
        this.dataSource = list;
      })
      .catch(err => {
        console.error(JSON.stringify(err))
        this._snackBar.showError("Error obteniendo la información! " + err);
      })
  }

  edit(extType: any) : void {
    this.router.navigate(['/pages/extinguishers/'+extType.id]);
  }

  delete(extType: any) : void {
    this.service.delete(extType.id).subscribe(
      _ => {
        this._snackBar.showSuccess("Matafuego borrado!");
        // this.loadData();
        this.service.search()
      },
      error => {
        this._snackBar.showError("Error borrando matafuego!");
      }
    )
  }

  create() : void {
    this.router.navigate(['/pages/extinguishers/0']);
  }

  print(ext: any) : void {
    window.open(environment.api_url+"extinguisher/print?id="+ext.id, "_blank");
  }

  filter() : void {
    this.service.clearState();
    let filters = [];
    if(this.codeFilter && this.codeFilter != "")
      filters.push({column: 'code', condition: Condition.contains, value: this.codeFilter}) 
    if(this.customerFilter)
      filters.push({column: 'customer', condition: Condition["="], value: this.customerFilter}) 
    if(filters.length > 0)
      this.service.filters = filters;
    this.service.search()
  }

  selectCustomer(id: any) : void {
    console.log("Selected:", id)
    this.customerFilter = (!id || id == 'null') ? null : id;
  }

}
