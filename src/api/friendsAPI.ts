import { auth, firestore, getUserDoc } from './firebaseAPI';
import { getStorageItem, setStorageItem } from './localstorageAPI';

import { IFriend } from '../_Types/appTypes';

export const AddFriend = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
): void => {
  // Get current user ID
  const currentUserID: string | undefined = auth.currentUser?.uid;

  const userId: string = event.currentTarget.name;
  const photo: string = event.currentTarget.value;

  // Get all friends from local storage
  const friends: IFriend[] = getStorageItem('friends');

  if (currentUserID !== userId) {
    // Find user in users collections and get him
    getUserDoc(userId)
      .get()
      .then((userData) => {
        if (userData.exists) {
          // Add in current user document new friend
          getUserDoc(currentUserID!).update({
            friends: firestore.FieldValue.arrayUnion({
              user: userId,
              name: `${userData.data()?.userInfo.firstName} ${
                userData.data()?.userInfo.secondName
              }`,
              photo,
            }),
          });

          if (friends) {
            if (!friends.find((friend: IFriend) => friend.user === userId)) {
              // Add new friend to friends array in local storage
              setStorageItem('friends', [
                ...friends,
                {
                  user: userId,
                  name: `${userData.data()?.userInfo.firstName} ${
                    userData.data()?.userInfo.secondName
                  }`,
                  photo,
                },
              ]);
            }
          } else {
            // Create an array of friends in local storage
            setStorageItem('friends', [
              {
                user: userId,
                name: `${userData.data()?.userInfo.firstName} ${
                  userData.data()?.userInfo.secondName
                }`,
                photo,
              },
            ]);
          }
        }
      });
  }
};

export const DeleteFriend = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
): void => {
  // Get current user ID
  const currentUserID = auth.currentUser?.uid;

  const userId = e.currentTarget.name;
  const photo = e.currentTarget.value;
  // Find user in users collections and get him

  getUserDoc(userId)
    .get()
    .then((userData) => {
      if (userData.exists) {
        // Remove in current user document a friend
        getUserDoc(currentUserID!).update({
          friends: firestore.FieldValue.arrayRemove({
            user: userId,
            name: `${userData.data()?.userInfo.firstName} ${
              userData.data()?.userInfo.secondName
            }`,
            photo,
          }),
        });
      }
      // Get all friends from local storage
      const friends: IFriend[] = getStorageItem('friends');

      if (friends) {
        // Delete friend from array in local storage
        setStorageItem(
          'friends',
          friends.filter((friend: IFriend) => {
            return friend.user !== userId;
          })
        );
      }
    });
};
