import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupDetailsComponent } from './group-details/group-details.component';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    GroupDetailsComponent
  ]
})
export class GroupModule { }
