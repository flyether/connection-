import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InitPeopleConversations } from './people.reducer';
import { selectReducerStateRouter } from '../group/group.selectors';


export const peopleListSelector = createFeatureSelector<InitPeopleConversations >('people');


export const GivMePeopleList= createSelector(
  peopleListSelector,
  (state) => state.peopleListWithConversations
);
export const GivMePeopleListAll= createSelector(
  peopleListSelector,
  (state) => state.peopleListAll.Items
);


// новое
export const GivSinceConversation= createSelector(
  peopleListSelector ,
 (state) => state.since
);

export const GivMeConversations= createSelector(
  peopleListSelector , selectReducerStateRouter,
  (state, router) => {
    const dialog = state.conversationPerson.find(dialog => dialog.id === router.state.params.id);  
    return dialog ? dialog.dialog.Items : [];
  }
);

export const GivMeMeConversationsList = createSelector(
  peopleListSelector ,
  (state)   => {
    
    return state.conversationsList.Items;
  }
);

export const GivMeMeConversationsListPerson = createSelector(
  peopleListSelector ,
  (state)   => {
    
    return state.conversationPerson;
  }
);

