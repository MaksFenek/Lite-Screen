// Action constants
import {
  ADD_FIRST_AND_SECOND_NAMES,
  ADD_LOADED,
  ADD_USER_DATE,
  ADD_USER_STATUS,
  ADD_USER_ID,
  ADD_USER_PHOTO,
} from '../Constants';

import { getUserDoc, getUserPhoto } from '../../api/firebaseAPI';
import { getStorageItem, setStorageItem } from '../../api/localstorageAPI';
import moment from 'moment';

// ==== TypeScript ====

export interface AddFirstAndSecondNamesActionInterface {
  type: typeof ADD_FIRST_AND_SECOND_NAMES;
  payload: {
    firstName: string;
    secondName: string;
  };
}

export interface AddUserDateInterface {
  type: typeof ADD_USER_DATE;
  payload: string | undefined;
}

export interface AddUserStatusInterface {
  type: typeof ADD_USER_STATUS;
  payload: string | undefined;
}

// ==== Actions ====

export const AddFirstAndSecondNamesAction = ({
  firstName,
  secondName,
}: {
  firstName: string;
  secondName: string;
}): AddFirstAndSecondNamesActionInterface => ({
  type: ADD_FIRST_AND_SECOND_NAMES,
  payload: {
    firstName,
    secondName,
  },
});

export const AddUserId = (userId: string) => ({
  type: ADD_USER_ID,
  payload: userId,
});

export const AddLoaded = (loadedStatus: boolean) => ({
  type: ADD_LOADED,
  payload: loadedStatus,
});

export const AddUserDate = (date: number | string) => ({
  type: ADD_USER_DATE,
  payload: date,
});

export const AddUserStatus = (status: string | undefined) => ({
  type: ADD_USER_STATUS,
  payload: status,
});

export const AddUserPhoto = (photo: string) => ({
  type: ADD_USER_PHOTO,
  payload: photo,
});

// ==== Thunks ====
export const GetUserThunk = (userId: string | undefined) => async (
  dispatch: any
) => {
  if (userId) {
    dispatch(AddUserId(userId!));
    await getUserDoc(userId)
      // Get found document
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          // Get data from document fields
          const firstName: string = snapshot.data()?.userInfo.firstName;
          const secondName: string = snapshot.data()?.userInfo.secondName;
          const birthday: string = moment(
            snapshot.data()?.userInfo.birthday
          ).format('YYYY-MM-DD');
          const status: string = snapshot.data()?.userInfo.status;

          // Get user info and set it to state
          getUserPhoto(userId).then((img) => {
            dispatch(AddUserPhoto(img));
          });

          // Create new action with user info
          // Dispatch action to reducer
          dispatch(
            AddFirstAndSecondNamesAction({
              firstName,
              secondName,
            })
          );

          dispatch(AddUserDate(birthday));
          dispatch(AddUserStatus(status));
        }
      });
    dispatch(AddLoaded(true));
    // Get the current user document from firebase
    getUserDoc(userId)
      .get()
      .then((user) => {
        if (user.exists) {
          // Get the friends from local storage
          const friends = getStorageItem('friends');
          if (user.data()?.friends) {
            // Take every friend
            setStorageItem('friends', user.data()?.friends);
          }

          if (
            // Check if  friends in user document in firebase is not equel to friends array in local storage
            // to not load again the friends array from firebase
            user.data()?.friends !== friends &&
            // And that there is friends array is exist
            friends !== undefined &&
            user.data()?.friends !== undefined
          ) {
            // Set friends in local storage
            setStorageItem('friends', user.data()?.friends);
          }
        }
      });
  }
};

export const SetUserInfoThunk = (
  firstName: string,
  secondName: string,
  birthday: number,
  status: string
) => (dispatch: any, getState: any) => {
  const state = getState().auth;
  // Set info in store
  dispatch(AddFirstAndSecondNamesAction({ firstName, secondName }));
  dispatch(AddUserDate(moment(birthday).format('YYYY-MM-DD')));
  dispatch(AddUserStatus(status));

  if (state.userId) {
    // Set info in firebase
    getUserDoc(state.userId).update({
      userInfo: {
        firstName,
        secondName,
        birthday,
        status,
      },
    });
  }
};
