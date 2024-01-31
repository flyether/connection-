import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedStateActions } from 'src/app/Store/shareState/shredState.action';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorModalComponent {
  @Input() errorIn: string
  constructor(private store$: Store) {}
  clear() {
    this.store$.dispatch(
      SharedStateActions.setError({ data:  '' })
    );
  }
}
