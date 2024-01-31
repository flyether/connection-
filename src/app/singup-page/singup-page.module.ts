import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingupPageRoutingModule } from './singup-page-routing.module';
import { SingupPageComponent } from './singup-page.component';
import { FormAuthComponent } from '../components/form-auth/form-auth.component';


@NgModule({
  declarations: [
    SingupPageComponent,
  ],
  imports: [
    CommonModule,
    SingupPageRoutingModule,
    FormAuthComponent
  ]
})
export class SingupPageModule { }
