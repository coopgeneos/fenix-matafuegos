import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { 
  MatCardModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { UserIdleModule } from 'angular-user-idle';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Components
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';

// Services
import { AuthService } from './auth.service';
import { IdleUserComponent } from './idle-user/idle-user.component';

import { CredentialsInterceptor } from '../interceptors/credentials.interceptor';

@NgModule({
  declarations: [
    SigninComponent, 
    SignupComponent, 
    AuthComponent, 
    IdleUserComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    UserIdleModule
  ],
  providers: [ 
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    } 
 ],
  entryComponents: [ IdleUserComponent ],
})
export class AuthModule { }
