import { Component, OnInit } from '@angular/core';
import { Extinguisher, ExtinguisherCategory } from 'src/app/models/extinguisher';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ExtinguishersService } from '../extinguisher.service';
import { CustomersService } from '../../customers/customers.service';
import { ExtinguisherTypeService } from '../extinguisher-type.service';
import { Customer } from 'src/app/models/customer';
import { ExtinguisherType, ExtinguisherTypeCategory } from 'src/app/models/extinguisherType';
import * as moment from 'moment';
import { CustomSnackService } from 'src/app/services/custom-snack.service';
import { Condition } from 'src/app/commons/directives/filterable.directive';

@Component({
  selector: 'app-extinguisher-form',
  templateUrl: './extinguisher-form.component.html',
  styleUrls: ['./extinguisher-form.component.css']
})
export class ExtinguisherFormComponent implements OnInit {

  id: number = 0;
  extinguisher: Extinguisher;

  code = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  costCenter = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  factoryNo = new FormControl('', [Validators.required]);
  bvNo = new FormControl('', [Validators.required]);
  manufacturing = new FormControl('', [Validators.required]);
  lastLoad = new FormControl('', [Validators.required]);
  lastHydraulicTest = new FormControl('', [Validators.required]);
  carID: string = null;
  category: ExtinguisherCategory = ExtinguisherCategory.DOMICILIARIO;
  categories = () => {
    return Object.keys(ExtinguisherCategory)
  }

  customerId: string = null; //Uso string para que el componente select me tome el valor
  customers: Customer[];
  
  typeId: string = null;
  extinguisherTypes: ExtinguisherType[];
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: ExtinguishersService,
    private _snackBar: CustomSnackService,
    private router: Router,
    public customerService: CustomersService,
    public typeService: ExtinguisherTypeService) { 
    this.activatedRouter.params.subscribe(
      params => { 
        this.id = Number(params['id']); 
      }
    );
  }

  ngOnInit() {
    if(this.id != 0) {
      this.service.get(this.id).subscribe(
        data => {
          this.code.setValue(data.code);
          this.category = data.category;
          this.location.setValue(data.location);
          this.costCenter.setValue(data.costCenter);
          this.address.setValue(data.address);
          this.factoryNo.setValue(data.factoryNo);
          this.bvNo.setValue(data.bvNo);
          this.manufacturing.setValue(moment(data.manufacturingDate).format("YYYY-MM-DD"));
          this.lastLoad.setValue(moment(data.lastLoad).format("YYYY-MM-DD"));
          this.lastHydraulicTest.setValue(moment(data.lastHydraulicTest).format("YYYY-MM-DD"));
          this.customerId = data.customer.id.toString();
          this.typeId = data.type.id.toString();
          this.carID = data.idCar;
        },
        error => {
          this._snackBar.showError("Error obteniendo la información!");
        }
      )
    }

    this.customerService.search()
      .then(list => {
        this.customers = list;
      })
      .catch(err => {
        this._snackBar.showError("Error obteniendo los clientes!");
      })

    this.typeService.clearState();
    this.typeService.filters = [{column: 'force', condition: Condition["="], value: true}]
    this.typeService.search()
      .then(list => {
        this.extinguisherTypes = list;
      })
      .catch(err => {
        this._snackBar.showError("Error obteniendo los tipos!");
      })
  }

  save() : void {
    let extinguisher = new Extinguisher();
    this.code.value && this.code.value != "" ? extinguisher.code = this.code.value : delete extinguisher.code;
    this.category ? extinguisher.category = this.category : delete extinguisher.category;
    this.costCenter && this.costCenter.value != "" ? extinguisher.costCenter = this.costCenter.value : delete extinguisher.costCenter;  
    this.location && this.location.value != "" ? extinguisher.location = this.location.value : delete extinguisher.location;  
    this.address.value && this.address.value != "" ? extinguisher.address = this.address.value : delete extinguisher.address; 
    this.factoryNo.value && this.factoryNo.value != "" ? extinguisher.factoryNo = this.factoryNo.value : delete extinguisher.factoryNo; 
    this.bvNo.value && this.bvNo.value != "" ? extinguisher.bvNo = this.bvNo.value : delete extinguisher.bvNo;
    this.manufacturing.value && this.manufacturing.value != "" ? extinguisher.manufacturingDate = this.manufacturing.value : delete extinguisher.manufacturingDate;
    this.lastLoad.value && this.lastLoad.value != "" ? extinguisher.lastLoad = this.lastLoad.value : delete extinguisher.lastLoad;
    this.lastHydraulicTest.value && this.lastHydraulicTest.value != "" ? extinguisher.lastHydraulicTest = this.lastHydraulicTest.value : delete extinguisher.lastHydraulicTest; 
    this.carID && this.carID != "" ? extinguisher.idCar = this.carID : delete extinguisher.idCar;

    if(this.customerId) {
      extinguisher.customer = new Customer();
      extinguisher.customer.id = Number(this.customerId); 
    } else 
      delete extinguisher.customer;
    
    if(this.typeId) {
      extinguisher.type = new ExtinguisherType();
      extinguisher.type.id = Number(this.typeId); 
    } else 
      delete extinguisher.type;
    
    if(this.validate()) {
      if(this.id == 0) {
        this.service.add(extinguisher).subscribe(
          _ => {
            this._snackBar.showSuccess("Matafuego guardado!");
            this.router.navigate(['/pages/extinguishers'])
          },
          error => {
            this._snackBar.showError("Error guardando matafuegos! " + error);
          }
        )
      } else {
        this.service.update(this.id, extinguisher).subscribe(
          _ => {
            this._snackBar.showSuccess("Matafuego actualizado!");
            this.router.navigate(['/pages/extinguishers'])
          },
          error => {
            this._snackBar.showError("Error actualizando matafuegos! " + error);
          }
        )
      }
    } else
    this._snackBar.showInfo("Verifique los campos!");
  }

  cancel() : void {
    this.router.navigate(['/pages/extinguishers'])
  }

  validate() : boolean {
    let error = false;
    if(this.category == ExtinguisherCategory.VEHICULAR && !this.carID) {
      error = true;
    }
    if(this.category == ExtinguisherCategory.DOMICILIARIO) {
      error = ( this.location.hasError('required') ||  
                this.address.hasError('required') || 
                this.costCenter.hasError('required')
              )     
    }
    return !(error ||  
      this.code.hasError('required') || 
      this.factoryNo.hasError('required') || 
      this.bvNo.hasError('required') || 
      this.manufacturing.hasError('required') || 
      this.lastLoad.hasError('required') || 
      this.lastHydraulicTest.hasError('required'))
  }

}
