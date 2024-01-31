// timer.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, timer } from 'rxjs';
import { map, takeUntil, takeWhile, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import { startTimer,  updateTimerCount } from './timer.actions';
import { TimerState } from './timer.reducer';




@Injectable()
export class TimerEffects {
  startTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startTimer),
      mergeMap((action) => {
        const { componentId } = action;

        return timer(0, 1000).pipe(
          takeWhile((count) => count < 60),
          map((count) => updateTimerCount({ componentId, count })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(private actions$: Actions) {}
}