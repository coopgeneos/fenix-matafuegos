import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { Configuration } from 'src/app/models/configuration';
import { Router } from '@angular/router';
import { CustomSnackService } from 'src/app/services/custom-snack.service';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.css']
})
export class ConfigurationFormComponent implements OnInit {

  config: Configuration = new Configuration();

  constructor(
    private service: ConfigurationService,
    private _snackBar: CustomSnackService) { }

  ngOnInit() {
    this.service.get(1).subscribe(
      data => {
        this.config = data;
      },
      error => {
        if (error.status == 404) {
          this.config = new Configuration();
        }
      }
    )    
  }

  save() : void {
    this.service.update(1, this.config).subscribe(
      data => {
        this._snackBar.showSuccess("Configuración guardada!")
      },
      error => {}
    );
  }

  cancel() : void {}

}
