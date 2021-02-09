import { getUserPhoto, getUsersCollection } from '../../api/firebaseAPI';
import {
  ADD_USER_IN_SEARCH,
  ADD_USER_SEARCH_LOADED,
  CLEAR_USER_SEARCH,
} from '../Constants';

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

export const ClearUserSearch = {
  type: CLEAR_USER_SEARCH,
};

export const AddUserSearchLoaded = {
  type: ADD_USER_SEARCH_LOADED,
};

export const AddUserInSearchThunk = (query: string) => (dispatch: any) => {
  dispatch(AddUserSearchLoaded);
  dispatch(ClearUserSearch);
  // Get the users collection from firebase
  getUsersCollection.get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      const reg = new RegExp(query, 'i');
      // Get name from user info
      const name: string = `${doc.data().userInfo.firstName} ${
        doc.data().userInfo.secondName
      }`;
      if (name.match(reg)?.input === name) {
        //Get user id
        const id: string = doc.id;
        getUserPhoto(id).then((url) => {
          dispatch(AddUserInSearch(name, id, url));
        });
        // Get user photo
      }
    });
  });
};
