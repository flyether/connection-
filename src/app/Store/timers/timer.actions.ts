// timer.actions.ts
import { createAction, props } from '@ngrx/store';

export const startTimer = createAction('[Timer] Start Timer', props<{ componentId: string }>());
// export const stopTimer = createAction('[Timer] Stop Timer', props<{ componentId: string }>());
export const updateTimerCount = createAction('[Timer] Update Timer Count', props<{ componentId: string, count: number }>());
