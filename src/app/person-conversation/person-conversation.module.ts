import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonConversationRoutingModule } from './person-conversation-routing.module';
import { PersonConversationComponent } from './person-conversation.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    PersonConversationComponent,
    CommonModule,
    PersonConversationRoutingModule
  ]
})
export class PersonConversationModule { }
