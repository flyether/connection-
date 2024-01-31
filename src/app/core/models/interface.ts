export interface Profile {
  uid: {
    S: string;
  };
  name: {
    S: string;
  };
  createdAt: {
    S: string; // unix timestamp
  };
  email: {
    S: string;
  };

}

export interface User {
  email: string;
  token?: string;
  uid: string;
  name?: string;
  profile: Profile;
}
export interface loginResponse {
  token: string;
  uid: string;
}
export interface GroupItems {
  id: {
    S: string;
  };
  name: {
    S: string;
  };
  createdAt: {
    S: string; // unix timestamp
  };
  createdBy: {
    S: string;
  };
  owner?: boolean;
}

export interface GroupList {
  Count: number;
  Items: GroupItems[];
}
export interface GroupDialogItems {
  authorID: {
    S: string;
  };
  message: {
    S: string;
  };
  createdAt: {
    S: string; // unix timestamp
  };
  owner?: boolean;
}
export interface GroupDialogs {
  Count: number;
  Items: GroupDialogItems[];
}
export interface GroupCreateReq
{
  groupID: string
}

export interface newGroupData {
  name: {
    S: string;
  };
  createdAt: {
    S: string; 
  };
  owner?: boolean;
}
export interface PeopleItems {
  name: {
    S: string;
  };
  uid: {
    S: string; 
  };
}
export interface GroupName {
  name: string;
  };

  export interface GroupID {
    groupID: string;
    };
    export interface Companion {
      companion: string;
      };
    
    export interface GroupMessage {
      groupID: string;
      message: string;
      };
      export interface   ConversationMessage {
        conversationID: string;
        message: string;
        };
      export interface ConversationID {
        conversationID: string;
        };
export interface PeopleList {
  Count: number;
  Items: PeopleItems[];
}
export interface PeopleWithConversations {
  name: {
    S: string;
  };
  uid: {
    S: string; // unix timestamp
  };
  conversation: boolean;
  conversationId: string;
}
export interface ConversationsItems {
  id: {
    S: string;
  };
  companionID: {
    S: string;
  };
}

export interface ConversationsList  {
  Count: number;
  Items: ConversationsItems[];
}
