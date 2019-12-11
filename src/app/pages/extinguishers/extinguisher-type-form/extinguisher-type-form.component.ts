import { Component, OnInit } from '@angular/core';
import { ExtinguisherType } from 'src/app/models/extinguisherType';
import { FormControl, Validators } from '@angular/forms';
import { ExtinguisherTypeService } from '../extinguisher-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
  category: string = "categ1";

  categories: string[] = ['categ1', 'categ2'];
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: ExtinguisherTypeService,
    private _snackBar: MatSnackBar,
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
          this.code.setValue(data.code);
          this.category = data.category;
          this.loadExpiration.setValue(data.loadExpiration);
          this.phExpiration.setValue(data.phExpiration);
          this.weight.setValue(data.weight);
          this.volume.setValue(data.volume);
        },
        error => {
          this._snackBar.open("Error fetching the extinguisherType!", "Close", { duration: 2000 });
        }
      )
    }
  }

  save() : void {
    let type = new ExtinguisherType();
    this.code.value && this.code.value != "" ? type.code = this.code.value : delete type.code;
    this.category && this.category != "" ? type.category = this.category : delete type.category;
    this.loadExpiration && this.loadExpiration.value != "" ? type.loadExpiration = this.loadExpiration.value : delete type.loadExpiration;  
    this.phExpiration.value && this.phExpiration.value != "" ? type.phExpiration = this.phExpiration.value : delete type.phExpiration; 
    this.weight.value && this.weight.value != "" ? type.weight = this.weight.value : delete type.weight; 
    this.volume.value && this.volume.value != "" ? type.volume = this.volume.value : delete type.volume; 
    if(this.validate()) {
      if(this.id == 0) {
        this.service.add(type).subscribe(
          _ => {
            this._snackBar.open("ExtinguisherType saved!", "Close", { duration: 2000 });
            this.router.navigate(['/pages/extinguisherstype'])
          },
          error => {
            this._snackBar.open("Error saving extinguisherType! " + error, "Close", { duration: 2000 });
          }
        )
      } else {
        this.service.update(this.id, type).subscribe(
          _ => {
            this._snackBar.open("ExtinguisherType saved!", "Close", { duration: 2000 });
            this.router.navigate(['/pages/extinguisherstype'])
          },
          error => {
            this._snackBar.open("Error updating extinguisherType!" + error, "Close", { duration: 2000 });
          }
        )
      }
    } else
    this._snackBar.open("Please check fields!","Close", { duration: 2000 });
  }

  cancel() : void {
    this.router.navigate(['/pages/extinguisherstype'])
  }

  validate() : boolean {
    let error = false;
    if(!this.categories.includes(this.category)) {
      error = true;
    }
    return !error && 
      !this.code.hasError('required') && 
      !this.loadExpiration.hasError('required') && 
      !this.phExpiration.hasError('required') && 
      !this.weight.hasError('required') && 
      !this.volume.hasError('required')
  }

}
