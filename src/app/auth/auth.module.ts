import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { FormAuthComponent } from '../components/form-auth/form-auth.component';


@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormAuthComponent
  ]
})
export class AuthModule { }
