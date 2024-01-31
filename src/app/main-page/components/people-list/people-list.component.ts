import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConversationsActions } from 'src/app/Store/people/conversations.action';
import { PeopleWithConversations } from 'src/app/core/models/interface';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['../group-list/group-list.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent {
  @Input() people: PeopleWithConversations
  goTo(id: string) {
    this.store$.dispatch(ConversationsActions.personConversationStart({ data: { conversationID : id } }));
  }
  addConversation(id: string) {
    this.store$.dispatch(ConversationsActions.conversationCreateStart({ data: { companion : id} }));
  }
  constructor(private store$: Store) {}

}
