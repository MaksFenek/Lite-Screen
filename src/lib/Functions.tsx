import { db, auth, firestore } from '../Firebase';

export const AddFriend = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
): void => {
  // Get current user ID
  const currentUserID = auth.currentUser?.uid;

  const userId = event.currentTarget.name;
  const photo = event.currentTarget.value;

  // Find user in users collections and get him
  db.collection('users')
    .doc(userId)
    .get()
    .then((userData) => {
      if (userData.exists) {
        // Add in current user document new friend
        db.collection('users')
          .doc(currentUserID)
          .update({
            friends: firestore.FieldValue.arrayUnion({
              user: userId,
              name: `${userData.data()?.userInfo.firstName} ${
                userData.data()?.userInfo.secondName
              }`,
              photo,
            }),
          });
        // Get all friends from local storage
        const friends = JSON.parse(localStorage.getItem('friends')!);

        if (localStorage.getItem('friends')) {
          // Add new friend to friends array in local storage
          localStorage.setItem(
            'friends',
            JSON.stringify([
              ...friends,
              {
                user: userId,
                name: `${userData.data()?.userInfo.firstName} ${
                  userData.data()?.userInfo.secondName
                }`,
                photo,
              },
            ])
          );
        } else {
          // Create an array of friends in local storage
          localStorage.setItem(
            'friends',
            JSON.stringify([
              {
                user: userId,
                name: `${userData.data()?.userInfo.firstName} ${
                  userData.data()?.userInfo.secondName
                }`,
                photo,
              },
            ])
          );
        }
      }
    });
};
