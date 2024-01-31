import { createFeatureSelector,  createSelector  } from "@ngrx/store";
import { TimerState } from "./timer.reducer";
import { RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "../router.serializer";
import { selectReducerStateRouter } from "../group/group.selectors";

export const timerFeatureSelector  = createFeatureSelector<TimerState>('timer');


export const selectTimerById = createSelector(
  timerFeatureSelector,
  selectReducerStateRouter,
  (state, router) => {
    const timersForComponent = state.timers[router.state.params.id];
    
    if (!timersForComponent) {
      return null;
    }


    const timer = timersForComponent.find(timer => timer.componentId === router.state.params.id);
    
    return timer ? timer.count : null;
  }
);
  