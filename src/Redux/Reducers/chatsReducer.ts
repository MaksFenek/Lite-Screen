import { ADD_USERS_CHATS, CLEAR_CHAT_STATE } from '../Constants';

export interface IChatItem {
  name: string;
  id: string;
  photo: string;
  lastMessage: string
}
export interface IInitialChatsState {
  chats: IChatItem[];
  count: number;
}

const initialChatsState: IInitialChatsState = { chats: [], count: 0 };

export default (state = initialChatsState, { type, payload }: any) => {
  switch (type) {
    case ADD_USERS_CHATS:
      return Object.assign({}, state, {
        chats: [
          ...state.chats,
          { name: payload.name, id: payload.id, photo: payload.photo, lastMessage: payload.lastMessage },
        ],
        count: 1 + state.count,
      });

    case CLEAR_CHAT_STATE:
      return { ...state, chats: [] };
    default:
      return state;
  }
};
