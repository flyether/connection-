import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingupPageComponent } from './singup-page.component';

const routes: Routes = [
  {
    path: '',
    component: SingupPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingupPageRoutingModule { }
