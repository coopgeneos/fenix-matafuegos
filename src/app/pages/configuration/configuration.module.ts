import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule, 
  MatSnackBarModule 
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ConfigurationFormComponent } from './configuration-form/configuration-form.component';
import { ConfigurationService } from './configuration.service';
import { CommonsModule } from 'src/app/commons/commons.module';

@NgModule({
  declarations: [ConfigurationFormComponent],
  imports: [
    CommonsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [ConfigurationService],
})
export class ConfigurationModule {}
