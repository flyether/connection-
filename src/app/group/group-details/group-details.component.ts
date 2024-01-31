import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, map, of, takeUntil } from 'rxjs';
import { GroupActions } from 'src/app/Store/group/group.action';
import {
  GivMeGroupDialogs,
  GivMeGroupList,
  GivSinceDialogs,
} from 'src/app/Store/group/group.selectors';
import { GivMePeopleListAll } from 'src/app/Store/people/people.selectors';
import { startTimer } from 'src/app/Store/timers/timer.actions';
import { selectTimerById } from 'src/app/Store/timers/timer.selectors';
import { ButtonStandardComponent } from 'src/app/components/button-standard/button-standart.component';
import { GroupDialogItems } from 'src/app/core/models/interface';
import { MassageFormComponent } from './massage-form/massage-form.component';
import { SortSearchPipe } from './sort-paipe';
import { PeopleActions } from 'src/app/Store/people/people.action';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonStandardComponent,
    RouterModule,
    MassageFormComponent,
    SortSearchPipe,
  ],
})
export class GroupDetailsComponent implements OnInit {
  authorName$: Observable<string>;
  groupDialogs$: Observable<GroupDialogItems[]> =
    this.store$.select(GivMeGroupDialogs);
  isDisableDel: boolean = false;
  myUid = localStorage.getItem('uid');
  groupName: string;
  ownerH: boolean = false;
  id: string = this.route.snapshot.paramMap.get('id') ?? '';
  isGet:number;
  selectedTimer$ = this.store$.select(selectTimerById);
  since = '';

  private subscription: Subscription[] =[];
  constructor(private store$: Store, private route: ActivatedRoute) {}

  onClickUpdate() {
    this.store$.dispatch(startTimer({ componentId: this.id }));
    this.store$.dispatch(
      GroupActions.groupDialogSinceStart({
        data: { groupID: this.id },
        since: this.since,
      })
    );
  }

  ngOnInit(): void {
    this.subscription.push( this.store$
      .select(GivSinceDialogs)
      .subscribe((value: string) => {
        this.since = value;
      }));
      this.subscription.push(  this.store$
        .select(GivMePeopleListAll)
        .subscribe((value) => {
          this.isGet = value.length;
        }));
        if(this.isGet <1) {
          this.store$.dispatch(GroupActions.groupDialogStart({ data: { groupID : this.id } }));
          this.store$.dispatch(PeopleActions.peopleStart());

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
    return this.store$.select(GivMeGroupList).pipe(
      map((groupList) => {
        const currentGroup = groupList.find((group) => group.id.S === this.id);
        if (currentGroup) {
          this.groupName = currentGroup.name.S;
          if(this.myUid === currentGroup.createdBy.S) this.ownerH = true
        }
        return this.groupName;
      })
    );
  }

  ClickDel() {
    this.isDisableDel = true;
    if (this.id)
      this.store$.dispatch(
        GroupActions.groupDelete({ data: { groupID: this.id }, redirect: true })
      );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(e => e.unsubscribe())
  }
}
