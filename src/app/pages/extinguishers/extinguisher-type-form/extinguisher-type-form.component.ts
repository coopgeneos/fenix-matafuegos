import { Component, OnInit } from '@angular/core';
import { ExtinguisherType, ExtinguisherTypeCategory } from 'src/app/models/extinguisherType';
import { FormControl, Validators } from '@angular/forms';
import { ExtinguisherTypeService } from '../extinguisher-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CustomSnackService } from 'src/app/services/custom-snack.service';

@Component({
  selector: 'app-extinguisher-type-form',
  templateUrl: './extinguisher-type-form.component.html',
  styleUrls: ['./extinguisher-type-form.component.css']
})
export class ExtinguisherTypeFormComponent implements OnInit {
  
  id: number = 0;
  extinguisherType: ExtinguisherType;

  code = new FormControl('', [Validators.required]);
  loadExpiration = new FormControl('', [Validators.required]);
  phExpiration = new FormControl('', [Validators.required]);
  weight = new FormControl('', [Validators.required]);
  volume = new FormControl('', [Validators.required]);
  category: ExtinguisherTypeCategory = ExtinguisherTypeCategory.A;

  categories = () => {
    return Object.keys(ExtinguisherTypeCategory)
  };
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: ExtinguisherTypeService,
    private _snackBar: CustomSnackService,
    private router: Router) { 
    this.activatedRouter.params.subscribe(
      params => { 
        this.id = Number(params['id']); 
      }
    );
    this.loadExpiration.setValue(365);
  }

  ngOnInit() {
    if(this.id != 0) {
      this.service.get(this.id).subscribe(
        data => {
          // this.code.setValue(data.code);
          this.category = data.category;
          this.loadExpiration.setValue(data.loadExpiration);
          this.phExpiration.setValue(data.phExpiration);
          this.weight.setValue(data.weight);
          this.volume.setValue(data.volume);
        },
        error => {
          this._snackBar.showError("Error obteniendo la información!");
        }
      )
    }
  }

  save() : void {
    let type = new ExtinguisherType();
    // this.code.value && this.code.value != "" ? type.code = this.code.value : delete type.code;
    this.category ? type.category = this.category : delete type.category;
    this.loadExpiration && this.loadExpiration.value != "" ? type.loadExpiration = this.loadExpiration.value : delete type.loadExpiration;  
    this.phExpiration.value && this.phExpiration.value != "" ? type.phExpiration = this.phExpiration.value : delete type.phExpiration; 
    this.weight.value && this.weight.value != "" ? type.weight = this.weight.value : delete type.weight; 
    this.volume.value && this.volume.value != "" ? type.volume = this.volume.value : delete type.volume; 
    if(this.validate()) {
      if(this.id == 0) {
        this.service.add(type).subscribe(
          _ => {
            this._snackBar.showSuccess("Tipo de matafuego guardado!");
            this.router.navigate(['/pages/extinguisherstype'])
          },
          error => {
            this._snackBar.showError("Error guardando el tipo de matafuego! " + error);
          }
        )
      } else {
        this.service.update(this.id, type).subscribe(
          _ => {
            this._snackBar.showSuccess("Tipo de matafuego guardado!");
            this.router.navigate(['/pages/extinguisherstype'])
          },
          error => {
            this._snackBar.showError("Error actualizando el tipo de matafuego! " + error);
          }
        )
      }
    } else
    this._snackBar.showInfo("Verifique los campos!");
  }

  cancel() : void {
    this.router.navigate(['/pages/extinguisherstype'])
  }

  validate() : boolean {
    let error = false;
    // if(!this.categories.includes(this.category.toString)) {
    //   error = true;
    // }
    return !(error ||  
      // this.code.hasError('required') ||  
      this.loadExpiration.hasError('required') ||  
      this.phExpiration.hasError('required') ||  
      this.weight.hasError('required') || 
      this.volume.hasError('required'))
  }

}
