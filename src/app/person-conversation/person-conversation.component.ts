import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonStandardComponent } from '../components/button-standard/button-standart.component';
import { MassageFormComponent } from '../group/group-details/massage-form/massage-form.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { GroupActions } from '../Store/group/group.action';
import { GivMeGroupDialogs, GivSinceDialogs, GivMeGroupList } from '../Store/group/group.selectors';
import { GivMeConversations, GivMeMeConversationsList, GivMePeopleListAll, GivSinceConversation } from '../Store/people/people.selectors';
import { startTimer } from '../Store/timers/timer.actions';
import { selectTimerById } from '../Store/timers/timer.selectors';
import { GroupDialogItems } from '../core/models/interface';
import { SortSearchPipe } from '../group/group-details/sort-paipe';
import { ConversationsActions } from '../Store/people/conversations.action';
import { PeopleActions } from '../Store/people/people.action';

@Component({
  selector: 'app-person-conversation',
  templateUrl: './person-conversation.component.html',
  styleUrls: ['./person-conversation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonStandardComponent, RouterModule,   MassageFormComponent, SortSearchPipe
  ]
})
export class PersonConversationComponent {

  authorName$: Observable<string>;
  PersonDialogs$: Observable<GroupDialogItems[]> =
    this.store$.select(GivMeConversations);
  isDisableDel: boolean = false;
  myUid = localStorage.getItem('uid');
  groupName: string;
  owner: boolean = false;
  id: string = this.route.snapshot.paramMap.get('id') ?? '';
isGet:number
  selectedTimer$ = this.store$.select(selectTimerById);
  since = '';
  private groupDataSubscription: Subscription;
  private subscription: Subscription[] = [];
  constructor(private store$: Store, private route: ActivatedRoute) {}

  onClickUpdate() {
    this.store$.dispatch(startTimer({ componentId: this.id }));
    this.store$.dispatch(
      ConversationsActions.personConversationSinceStart({
        data: { conversationID: this.id },
        since: this.since,
      })
    );
  }

  ngOnInit(): void {
    this.subscription.push(  this.store$
      .select(GivSinceConversation)
      .subscribe((value: string) => {
        this.since = value;
      }));
      this.subscription.push(  this.store$
        .select(GivMePeopleListAll)
        .subscribe((value) => {
          this.isGet = value.length;
        }));
        if(this.isGet <1) {
          this.store$.dispatch(ConversationsActions.personConversationStart({ data: { conversationID : this.id  } }));
          this.store$.dispatch(PeopleActions.peopleStart());
    this.store$.dispatch(ConversationsActions.conversationsStart());
        }
  }

  isTimerInRange(timer: number | null): boolean {
    return timer !== null && timer > 0 && timer < 59;
  }
  authorName(uid: string) {
    return this.store$.select(GivMePeopleListAll).pipe(
      map((peopleList) => {
        const person = peopleList.find((person) => person.uid.S === uid);
        return person ? person.name.S : '';
      })
    );
  }

  groupData() {
    return this.store$.select(GivMeMeConversationsList).pipe(
      map((groupList) => {
        const conversation = groupList.find((com) => com.id.S === this.id);
        if (conversation) {
          this.subscription.push(this.store$.select(GivMePeopleListAll).pipe(
            map((peopleList) => {
              const person = peopleList.find((person) => person.uid.S === conversation.companionID.S);
              this.groupName = person?.name.S ?? 'N';
            })
          ).subscribe()); 
          return this.groupName;
        } else {
          return '';
        }
      })
    );
  }

  ClickDel() {
    this.isDisableDel = true;
    if (this.id)
      this.store$.dispatch(
       ConversationsActions.conversationDelete({ data: { conversationID: this.id }})
      );
  
  }

  ngOnDestroy(): void {
    this.subscription.forEach(e => e.unsubscribe())
   
  }
}
