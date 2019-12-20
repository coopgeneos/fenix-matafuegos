import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AuthService } from './auth/auth.service';
import { IsAuthenticatedGuard } from './guards/isAuthenticated.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CredentialsInterceptor } from './interceptors/credentials.interceptor';
import { CommonsModule } from './commons/commons.module';
import { TranslatorPipe } from './pipes/translator.pipe';
import { CustomSnackService } from './services/custom-snack.service';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TranslatorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService, 
    IsAuthenticatedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    },
    CustomSnackService
  ],
  exports: [TranslatorPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
