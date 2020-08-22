import {
  firestore,
  getUserDoc,
  getUserPhoto,
  getUsersChatCollection,
} from '../../api/firebaseAPI';
import { ADD_USERS_CHATS, CLEAR_CHAT_STATE } from '../Constants';

export const AddUsersChats = (name: string, id: string, photo: string) => ({
  type: ADD_USERS_CHATS,
  payload: {
    name,
    id,
    photo,
  },
});

export const ClearChatState = {
  type: CLEAR_CHAT_STATE,
};

export const GetUsersChatsThunk = (userId: string) => (dispatch: any) => {
  if (userId) {
    // Find in collection chats which is contain current user id
    getUsersChatCollection
      .where('users', 'array-contains-any', [userId])
      .get()
      .then((result) =>
        // Take every chat and find the chats and get another user id
        result.docs.forEach((chat) => {
          const user = chat
            .data()
            .users.find((user: string) => user !== userId);
          if (user) {
            // Update the chats array in user document
            getUserDoc(userId).update({
              chats: firestore.FieldValue.arrayUnion({ id: chat.id, user }),
            });
          }
        })
      )
      .then(() => {
        // Listen every changing in user document
        getUserDoc(userId).onSnapshot((user) => {
          dispatch(ClearChatState);
          user.data()?.chats.forEach((chat: any) => {
            // Get all chats users
            getUserDoc(chat.user)
              .get()
              .then((user) => {
                // Get them photo
                getUserPhoto(user.id).then((photo) => {
                  dispatch(
                    AddUsersChats(
                      user.data()?.userInfo.firstName +
                        ' ' +
                        user.data()?.userInfo.secondName,
                      user.id,
                      photo
                    )
                  );
                });
              });
          });
        });
      });
  }
};
