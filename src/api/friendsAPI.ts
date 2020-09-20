import { auth, firestore, getUserDoc, getUsersCollection } from './firebaseAPI';
import { getStorageItem, setStorageItem } from './localstorageAPI';

import { IFriend } from '../_Types/appTypes';

export const AddFriend = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
): void => {
  // Get current user ID
  const currentUserID: string | undefined = auth.currentUser?.uid;

  const userId: string = event.currentTarget.name;

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

export const getFriendsCount = async (userId: string) => {
  if (userId) {
    let count = 0;
    // Get user doucment by id
    await getUserDoc(userId)
      .get()
      .then((user) => {
        // Get friends array length
        if (user.data()?.friends) {
          count = user.data()?.friends.length;
        }
      });
    return count;
  }
};

export const getAllFriends = (userId: string) => {
  if (userId) {
    // Get user document by id
    return getUserDoc(userId)
      .get()
      .then((user) => user.data()?.friends);
  }
};

export const getFollowingCount = async (userId: string) => {
  if (userId) {
    let count = 0;
    // Get collection 'users'
    await getUsersCollection
      // Search an user which has a searching user in friends array
      .where('friends', 'array-contains', {
        user: userId,
      })
      .get()
      .then((user) => {
        // Set followers array length
        if (user.docs) {
          count = user.docs.length;
        }
      });

    return count;
  }
};

export const getAllFollowers = (userId: string) => {
  if (userId) {
    // Get collection 'users'
    return (
      getUsersCollection
        // Search an user which has a searching user in friends array
        .where('friends', 'array-contains', {
          user: userId,
        })
        .get()
        .then((user) => {
          // Return the users
          return user.docs;
        })
    );
  }
};
