import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { ButtonStandardComponent } from '../components/button-standard/button-standart.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [


 
  ],
  imports: [
    MainPageComponent,
    CommonModule,
    ButtonStandardComponent,
    MainPageRoutingModule,
    ModalComponent ,
    PeopleListComponent,
    GroupListComponent,
  ]
})
export class MainPageModule { }
