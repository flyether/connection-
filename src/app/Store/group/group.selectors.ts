import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GroupListInitialState } from './group.reducer';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../router.serializer';


export const groupListSelector = createFeatureSelector<GroupListInitialState >('group');
export const selectReducerStateRouter = createFeatureSelector<
RouterReducerState<RouterStateUrl>
>("router");


export const GivMeGroupList= createSelector(
   groupListSelector ,
  (state) => state.groupList.Items,
);
export const GivMeGroupDialogs= createSelector(
  groupListSelector , selectReducerStateRouter,
  (state, router) => {
    const dialog = state.groupDialogs.find(dialog => dialog.id === router.state.params.id);  
    return dialog ? dialog.dialog.Items : [];
  }
);

export const GivMeGroupDialogsList = createSelector(
  groupListSelector,
  (state)   => {
    
    return state.groupDialogs;
  }
);

export const GivSinceDialogs= createSelector(
  groupListSelector ,
 (state) => state.since
);