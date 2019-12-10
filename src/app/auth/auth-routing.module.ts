import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: '**', redirectTo: 'signin', pathMatch: 'full'},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
