import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  finalize,
  interval,
  of,
  take,
  takeUntil,
} from 'rxjs';
import { GroupItems, PeopleWithConversations } from '../core/models/interface';
import { Store } from '@ngrx/store';
import { GivMeGroupList } from '../Store/group/group.selectors';
import { GroupActions } from '../Store/group/group.action';
import { GivMePeopleList } from '../Store/people/people.selectors';
import { PeopleActions } from '../Store/people/people.action';
import { ConversationsActions } from '../Store/people/conversations.action';
import { ButtonStandardComponent } from '../components/button-standard/button-standart.component';
import { CommonModule } from '@angular/common';

import { GroupListComponent } from './components/group-list/group-list.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { TimerService } from '../core/services/timer.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [
    ModalComponent,
    GroupListComponent,
    ButtonStandardComponent,
    CommonModule,
    PeopleListComponent,
  ],
})
export class MainPageComponent implements OnInit {
  groupList$: Observable<GroupItems[]> = this.store$.select(GivMeGroupList);
  peopleList$: Observable<PeopleWithConversations[]> =
    this.store$.select(GivMePeopleList);
  theme: string;
  timer$: Observable<number>;
  timerPeople$: Observable<number>;
  isModalCreate: boolean = false;
  isDisabledGroup: boolean = false;
  isDisabledPeople: boolean = false;
  timerVisibleGroup: boolean = false;
  timerVisiblePeople: boolean = false;
  private ngUnsubscribe = new Subject();

  constructor(private store$: Store, private timerService: TimerService) {}
  ngOnInit(): void {
    this.timerService.timerCount$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((count) => {
        this.timer$ = of(count);
        this.isDisabledGroup = count > 0 && count < 60;
        this.timerVisibleGroup = count > 0 && count < 60;
      });
    this.timerService.timerCountPeople$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((count) => {
        this.timerPeople$ = of(count);
        this.isDisabledPeople = count > 0 && count < 60;
        this.timerVisiblePeople = count > 0 && count < 60;
      });

    this.store$.dispatch(GroupActions.groupStart());
    this.store$.dispatch(PeopleActions.peopleStart());
    this.store$.dispatch(ConversationsActions.conversationsStart());
  }

  onClickUpdate() {

    this.store$.dispatch(GroupActions.groupStart());
    this.timerService.startTimer();
  }

  onClickUpdatePeople() {

    this.store$.dispatch(PeopleActions.peopleStart());
    this.store$.dispatch(ConversationsActions.conversationsStart());
    this.timerService.startTimerPeople();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
  }
}
