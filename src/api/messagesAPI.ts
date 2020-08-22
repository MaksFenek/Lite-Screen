import { auth, firestore, getUserDoc } from './firebaseAPI';
import { getUsersChatCollection } from './firebaseAPI';

export const createChat = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
): void => {
  const userId = event.currentTarget.name;
  const currentUserId = auth.currentUser?.uid;
  if (userId !== currentUserId) {
    getUserDoc(currentUserId!)
      // Get current user document
      .get()
      .then((user) => {
        // Check if chats array is exist
        if (user.data()?.chats) {
          // Find chat with the same user id as taken id
          if (!user.data()?.chats.find((chat: any) => chat.user === userId)) {
            // Add in collection 'chats' a new chat
            getUsersChatCollection
              .add({ messages: [], users: [userId, currentUserId] })
              .then((chat) => {
                // Add a new chat in current user document
                getUserDoc(currentUserId!).update({
                  chats: firestore.FieldValue.arrayUnion({
                    id: chat.id,
                    user: userId,
                  }),
                });
              });
          }
        } else {
          // Add a new chat in current user document
          getUsersChatCollection
            .add({ messages: [], users: [userId, currentUserId] })
            .then((chat) => {
              getUserDoc(currentUserId!).update({
                chats: firestore.FieldValue.arrayUnion({
                  id: chat.id,
                  user: userId,
                }),
              });
            });
        }
      });
  }
};

export const getAllMessages = (userId: string, setMessages: any) => {
  // Get current user id
  const currentUserId = auth.currentUser?.uid;
  // Get user document by id
  getUserDoc(currentUserId!)
    .get()
    .then((user) => {
      // Find chat by user id
      const needChat = user
        .data()
        ?.chats.find((chat: any) => chat.user === userId);
      if (needChat) {
        // Get the chat with user
        getUsersChatCollection.doc(needChat.id).onSnapshot((chat: any) => {
          // Set all messages in state
          setMessages(chat.data()?.messages);
        });
      }
    });
};

export const sendMessage = (userId: string, text: string, date: any) => {
  console.log('hi');

  // Get current user id
  const currentUserId = auth.currentUser?.uid;
  getUserDoc(currentUserId!)
    .get()
    .then((user) => {
      // Find need chat
      const needChat = user
        .data()
        ?.chats.find((chat: any) => chat.user === userId);
      // Add in chat a new message with author as current user id
      getUsersChatCollection.doc(needChat.id).update({
        messages: firestore.FieldValue.arrayUnion({
          author: currentUserId,
          text,
          date,
        }),
      });
    });
};
