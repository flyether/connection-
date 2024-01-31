import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonConversationComponent } from './person-conversation.component';
const routes: Routes = [

  {
    path: ':id',
    component: PersonConversationComponent ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonConversationRoutingModule { }
