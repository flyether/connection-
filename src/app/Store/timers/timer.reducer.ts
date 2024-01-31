// timer.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {  startTimer,  updateTimerCount } from './timer.actions';
export interface Timer {
   componentId: string;
   count: number;
 }

 export interface TimerState {
   timers: { [key: string]: Timer[] };
 }
 
 export const initialState: TimerState = {
   timers: {},
 };
 
 export const timerReducer = createReducer(
   initialState,
   on(startTimer, (state, { componentId }) => {
     const timersForComponent = state.timers[componentId] || [];
     return {
       ...state,
       timers: {
         ...state.timers,
         [componentId]: [...timersForComponent, { componentId, count: 0 }],
       },
     };
   }),
   // on(stopTimer, (state, { componentId }) => {
   //   const updatedTimers = { ...state.timers };
   //   delete updatedTimers[componentId];
   //   return {
   //     ...state,
   //     timers: updatedTimers,
   //   };
   // }),
   on(updateTimerCount, (state, { componentId, count }) => {
     const timersForComponent = state.timers[componentId] || [];
     const updatedTimers = timersForComponent.map((timer) =>
       timer.componentId === componentId ? { ...timer, count } : timer
     );
     return {
       ...state,
       timers: {
         ...state.timers,
         [componentId]: updatedTimers,
       },
     };
   })
 );

