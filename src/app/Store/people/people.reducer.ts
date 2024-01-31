import { Action, createReducer, on } from '@ngrx/store';

import {
  ConversationsList,
  GroupDialogItems,
  GroupDialogs,
  PeopleList,
  PeopleWithConversations,
} from 'src/app/core/models/interface';
import { PeopleActions } from './people.action';
import { ConversationsActions } from './conversations.action';
export interface InitPeopleConversations {
  peopleList: PeopleList;
  peopleListAll: PeopleList;
  conversationsList: ConversationsList;
  peopleListWithConversations: PeopleWithConversations[];
  since: string;
  conversationPerson: { id: string; dialog: GroupDialogs }[];
  newConversation: GroupDialogItems;
}
const myUid = localStorage.getItem('uid');
const initialState: InitPeopleConversations = {
  peopleList: { Items: [], Count: 0 },
  peopleListAll: { Items: [], Count: 0 },
  conversationsList: { Items: [], Count: 0 },
  peopleListWithConversations: [],
  conversationPerson: [],
  since: '',
  newConversation: {
    authorID: {
      S: '',
    },
    message: {
      S: '',
    },
    createdAt: {
      S: '',
    },
  },
};

const reducer = createReducer(
  initialState,

  on(PeopleActions.peopleSuccess, (state, { data }) => {
    const updatedPeopleList = data;
    let conversationId = '';
    const myUid = localStorage.getItem('uid');
    const updatedPeopleListWithConversations = updatedPeopleList.Items.filter(
      (person) => person.uid.S !== myUid
    ).map((person) => {
      const conversationExists = state.conversationsList.Items.some(
        (conversation) => {
          if (conversation.companionID.S === person.uid.S) {
            conversationId = conversation.id.S;
          }

          return conversation.companionID.S === person.uid.S;
        }
      );
      return {
        ...person,
        conversation: conversationExists,
        conversationId: conversationId,
      };
    });

    return {
      ...state,
      peopleListAll: data,
      peopleList: updatedPeopleList,
      peopleListWithConversations: updatedPeopleListWithConversations,
    };
  }),
  on(ConversationsActions.conversationsSuccess, (state, { data }) => ({
    ...state,
    conversationsList: data,
  })),

  // новое
  on(ConversationsActions.conversationSince, (state, { data }) => ({
    ...state,
    since: data,
  })),
  on(ConversationsActions.conversationDeleteSuccess, (state, { data }) => {
    const updatedConversationsList = state.conversationsList.Items.filter(
      (group) => group.id.S !== data.conversationID
    );

    return {
      ...state,
      conversationsList: {
        ...state.conversationsList,
        Items: updatedConversationsList,
        Count:updatedConversationsList.length,
      }

    }
  }),


  on(ConversationsActions.personConversationSuccess, (state, { data, id }) => {
    const isDuplicate = state.conversationPerson.some(
      (dialog) => dialog.id === id
    );
    if (!isDuplicate) {
      const newDialog = {
        id: id || '',
        dialog: data,
      };
      return {
        ...state,
        conversationPerson: [...state.conversationPerson, newDialog],
      };
    } else {
      return state;
    }
  }),
  on(
    ConversationsActions.personConversationSinceSuccess,
    (state, { data, id }) => {
      const existingDialogIndex = state.conversationPerson.findIndex(
        (dialog) => dialog.id === id
      );

      if (existingDialogIndex !== -1) {
        const existingDialog = state.conversationPerson[existingDialogIndex];
        const updatedDialog = {
          ...existingDialog,
          dialog: {
            ...existingDialog.dialog,
            Items: [...existingDialog.dialog.Items, ...data.Items],
          },
        };

        const updatedGroupDialogs = [...state.conversationPerson];
        updatedGroupDialogs[existingDialogIndex] = updatedDialog;

        return {
          ...state,
          conversationPerson: updatedGroupDialogs,
        };
      } else {
        return state;
      }
    }
  ),
  // on(ConversationsActions.conversationCreateNewToStore, (state, {data}) => ({
  //   ...state,
  //   newConversation: data
  // })),
  on(ConversationsActions.conversationCreateSuccess, (state, { data }) => ({
    ...state,
  }))
);
export function peopleReducer(
  state: InitPeopleConversations | undefined,
  action: Action
) {
  return reducer(state, action);
}
