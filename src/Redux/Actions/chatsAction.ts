import { getUserDoc, getUserPhoto, getUsersChatCollection } from '../../api/firebaseAPI';
import { ADD_USERS_CHATS, CLEAR_CHAT_STATE } from '../Constants';

export const AddUsersChats = (name: string, id: string, photo: string, lastMessage:string) => ({
  type: ADD_USERS_CHATS,
  payload: {
    name,
    id,
    photo,
    lastMessage
  },
});

export const ClearChatState = {
  type: CLEAR_CHAT_STATE,
};

export const GetUsersChatsThunk = (userId: string) => (dispatch: any) => {
  if (userId) {
    // Listen every changing in user document
    getUserDoc(userId).onSnapshot((user) => {
      dispatch(ClearChatState);
      user.data()?.chats.forEach((chat: any) => {
        // Get all chats users
        getUserDoc(chat.user)
          .get()
          .then((user) => {
          if (chat.id) {
            let lastMessage = ''
            // Get the chat with user
            getUsersChatCollection.doc(chat.id).get().then((needChat: any) => {
              // Set all messages in state
              if(needChat.data()?.messages.length !== 0){
                 lastMessage =  needChat.data()?.messages[needChat.data()?.messages.length - 1].text.substring(0,60)
              }
            // Get them photo
            getUserPhoto(user.id).then((photo) => {
              dispatch(
                AddUsersChats(
                  user.data()?.userInfo.firstName +
                    ' ' +
                    user.data()?.userInfo.secondName,
                  user.id,
                  photo,
                  lastMessage
                )
              );
            });

            })
          }
            
          });
      });
    });
  }
};
