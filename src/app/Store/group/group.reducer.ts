import { Action, createReducer, on } from '@ngrx/store';

import {
  GroupDialogs,
  GroupItems,
  GroupList,
  newGroupData,
} from 'src/app/core/models/interface';
import { GroupActions } from './group.action';
export interface GroupListInitialState {
  groupList: GroupList;
  newGroupData: newGroupData;
  groupDialogs: { id: string; dialog: GroupDialogs }[];
  since: string;
}
const myUid = localStorage.getItem('uid');
const initialState: GroupListInitialState = {
  groupList: { Items: [], Count: 0 },
  newGroupData: {
    name: {
      S: '',
    },
    createdAt: {
      S: '',
    },
  },
  groupDialogs: [],
  since: '',
};

const reducer = createReducer(
  initialState,
  on(GroupActions.groupCreateNewToStore, (state, { data }) => ({
    ...state,
    newGroupData: data,
  })),
  on(GroupActions.groupSince, (state, { data }) => ({
    ...state,
    since: data,
  })),

  on(GroupActions.groupDialogSuccess, (state, { data, id }) => {
    const isDuplicate = state.groupDialogs.some((dialog) => dialog.id === id);
    if (!isDuplicate) {
      const newDialog = {
        id: id || '',
        dialog: data,
      };
      return {
        ...state,
        groupDialogs: [...state.groupDialogs, newDialog],
      };
    } else {
      return state;
    }
  }),
  on(GroupActions.groupDialogSinceSuccess, (state, { data, id }) => {
    const existingDialogIndex = state.groupDialogs.findIndex(
      (dialog) => dialog.id === id
    );

    if (existingDialogIndex !== -1) {
      const existingDialog = state.groupDialogs[existingDialogIndex];
      const updatedDialog = {
        ...existingDialog,
        dialog: {
          ...existingDialog.dialog,
          Items: [...existingDialog.dialog.Items, ...data.Items],
        },
      };

      const updatedGroupDialogs = [...state.groupDialogs];
      updatedGroupDialogs[existingDialogIndex] = updatedDialog;

      return {
        ...state,
        groupDialogs: updatedGroupDialogs,
      };
    } else {
      return state;
    }
  }),

  on(GroupActions.groupCreateSuccess, (state, { data }) => {
    const newGroup: GroupItems = {
      owner: true,
      id: {
        S: data.groupID,
      },
      name: { S: state.newGroupData.name.S },
      createdAt: { S: state.newGroupData.createdAt.S },
      createdBy: {
        S: myUid ?? '',
      },
    };
    return {
      ...state,
      groupList: {
        ...state.groupList,
        Items: [newGroup, ...state.groupList.Items],
      },
    };
  }),

  on(GroupActions.groupSuccess, (state, { data }) => {
    const updatedGropeListWithConversations = data.Items.map((group) => {
      let owner = false;
      if (group.createdBy.S === myUid) owner = true;
      return {
        ...group,
        owner: owner,
      };
    });
    return {
      ...state,
      groupList: {
        Items: updatedGropeListWithConversations,
        Count: data.Count,
      },
    };
  }),

  on(GroupActions.groupDelete, (state, { data }) => {
    const updatedGroupList = state.groupList.Items.filter(
      (group) => group.id.S !== data.groupID
    );

    return {
      ...state,
      groupList: {
        ...state.groupList,
        Items: updatedGroupList,
        Count: updatedGroupList.length,
      },
    };
  })
);

export function groupReducer(
  state: GroupListInitialState | undefined,
  action: Action
) {
  return reducer(state, action);
}
