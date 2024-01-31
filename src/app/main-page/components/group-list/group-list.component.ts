import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { GroupActions } from 'src/app/Store/group/group.action';
import { GroupItems } from 'src/app/core/models/interface';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListComponent {
  @Input() groupList: GroupItems
  constructor(private store$: Store) {}
  ClickDel(id: string ){
    this.store$.dispatch(GroupActions.groupDelete({ data: {groupID:id }, redirect: false }));
  }
  goTo(id: string) {
    this.store$.dispatch(GroupActions.groupDialogStart({ data: { groupID : id } }));
  }
}
