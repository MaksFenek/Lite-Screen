import { db, storageRef } from '../../Firebase';
import { ADD_USER_IN_SEARCH, ADD_USER_SEARCH_LOADED } from '../Constants';

export interface PostAction {
  type: typeof ADD_USER_IN_SEARCH;
  payload: {
    name: string;
    link: string;
    photo: string;
  };
}

export const AddUserInSearch = (
  name: string,
  link: string,
  photo: string
): PostAction => ({
  type: ADD_USER_IN_SEARCH,
  payload: {
    name,
    link,
    photo,
  },
});

export const AddUserSearchLoaded = {
  type: ADD_USER_SEARCH_LOADED,
};

export const AddUserInSearchThunk = () => (dispatch: any) => {
  dispatch(AddUserSearchLoaded);

  // Get the users collection from firebase
  db.collection('users')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        // Get name from user info
        const name: string = `${doc.data().userInfo.firstName} ${
          doc.data().userInfo.secondName
        }`;
        //Get user id
        const id: string = doc.id;

        // Get user photo
        storageRef
          .child(`${id}/`)
          .child('photo')
          .getDownloadURL()
          .then((url) => {
            // Create new user in search page
            dispatch(AddUserInSearch(name, id, url));
          });
      });
    });
};
