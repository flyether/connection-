import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SharedStateSelectors } from 'src/app/Store/shareState/sareState.selector';
import { SharedStateActions } from 'src/app/Store/shareState/shredState.action';
import { ButtonStandardComponent } from '../button-standard/button-standart.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-ok',
  templateUrl: './modal-ok.component.html',
  styleUrls: ['./modal-ok.component.scss'],
  standalone: true,
  imports: [CommonModule,  ButtonStandardComponent, MatSnackBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalOkComponent implements OnInit, OnDestroy {
  message:Observable<string>
  private destroyed$: Subject<void> = new Subject<void>();
  constructor(private store$: Store) {}
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.message = this.store$.select(SharedStateSelectors.modalOkMessage)
    this.message.pipe(takeUntil(this.destroyed$)).subscribe((message) => {
      if (message) {
        setTimeout(() => {
          this.clear();
        }, 2000);
      }
    });

  }
  
  clear() {
    this.store$.dispatch(SharedStateActions.setModalOk({ status: false,message:'' }))
  }
}
