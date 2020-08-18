// Action constants
import {
  ADD_USERS_FIRST_AND_SECOND_NAMES,
  ADD_USERS_DATE,
  ADD_USERS_STATUS,
  ADD_USERS_PHOTO,
} from '../Constants';

import { db, storageRef } from '../../Firebase';

// ==== TypeScript ====

export interface AddUsersFirstAndSecondNamesActionInterface {
  type: typeof ADD_USERS_FIRST_AND_SECOND_NAMES;
  payload: {
    firstName: string;
    secondName: string;
  };
}

export interface AddUsersDateInterface {
  type: typeof ADD_USERS_DATE;
  payload: string | undefined;
}

export interface AddUsersStatusInterface {
  type: typeof ADD_USERS_STATUS;
  payload: string | undefined;
}

// ==== Actions ====

export const AddUsersFirstAndSecondNamesAction = ({
  firstName,
  secondName,
}: {
  firstName: string;
  secondName: string;
}): AddUsersFirstAndSecondNamesActionInterface => ({
  type: ADD_USERS_FIRST_AND_SECOND_NAMES,
  payload: {
    firstName,
    secondName,
  },
});

export const AddUsersDate = (
  date: string | undefined
): AddUsersDateInterface => ({
  type: ADD_USERS_DATE,
  payload: date,
});

export const AddUsersStatus = (status: string | undefined) => ({
  type: ADD_USERS_STATUS,
  payload: status,
});

export const AddUsersPhoto = (photo: string) => ({
  type: ADD_USERS_PHOTO,
  payload: photo,
});

// ==== Thunks ====
export const GetUsersThunk = (userId: string | undefined) => (
  dispatch: any
) => {
  dispatch(
    AddUsersFirstAndSecondNamesAction({
      firstName: '',
      secondName: '',
    })
  );
  dispatch(AddUsersDate(''));
  dispatch(AddUsersStatus(''));
  dispatch(AddUsersPhoto(''));

  if (userId) {
    db.collection('users')
      .doc(userId)
      // Get found document
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          // Get data from document fields
          const firstName: string = snapshot.data()?.userInfo.firstName;
          const secondName: string = snapshot.data()?.userInfo.secondName;
          const birthday: string = snapshot.data()?.userInfo.birthday;
          const status: string = snapshot.data()?.userInfo.status;

          // Create new action with user info
          // Dispatch action to reducer
          dispatch(AddUsersDate(birthday));
          dispatch(AddUsersStatus(status));
          dispatch(
            AddUsersFirstAndSecondNamesAction({
              firstName,
              secondName,
            })
          );

          // Get user info and set it to state
        }
      });
    storageRef
      .child(`${userId}`)
      .child('photo')
      .getDownloadURL()
      .then((img) => {
        dispatch(AddUsersPhoto(img));
      });
  }
};
