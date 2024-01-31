import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shredStateReducer.reducer";

export namespace SharedStateSelectors {
   export const sharedState = createFeatureSelector<SharedState>('sharedState');
   export const modalOkStatus = createSelector(
     sharedState,
     state => state.okModal.status
   );
   export const modalOkMessage = createSelector(
     sharedState,
     state => state.okModal.message
   );
   export const errorFromServer = createSelector(
     sharedState,
     state => state.error
   );
   export const isLoading = createSelector(
     sharedState,
     state => state.loading
   );
 }