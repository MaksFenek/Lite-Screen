// Action constants
import {
  ADD_USERS_FIRST_AND_SECOND_NAMES,
  ADD_USERS_DATE,
  ADD_USERS_STATUS,
  ADD_USERS_PHOTO,
  ADD_USERS_IS_FRIEND,
  ADD_USERS_FOLLOWING_COUNT,
  ADD_USERS_FOLLOWERS_COUNT,
} from '../Constants';

import { getUserDoc, getUserPhoto } from '../../api/firebaseAPI';
import { getStorageItem } from '../../api/localstorageAPI';
import { getFollowingCount, getFriendsCount } from '../../api/friendsAPI';

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
  payload: number | undefined;
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
  date: number | undefined
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

export const AddUsersFollowingCount = (followersCount: number) => ({
  type: ADD_USERS_FOLLOWING_COUNT,
  payload: followersCount,
});

export const AddUsersFollowersCount = (followingCount: number) => ({
  type: ADD_USERS_FOLLOWERS_COUNT,
  payload: followingCount,
});

export const AddUsersIsFriend = (isFriend: boolean) => ({
  type: ADD_USERS_IS_FRIEND,
  payload: isFriend,
});

// ==== Thunks ====
export const GetUsersThunk = (userId: string | undefined) => (
  dispatch: any,
  getState: any
) => {
  dispatch(
    AddUsersFirstAndSecondNamesAction({
      firstName: '',
      secondName: '',
    })
  );
  dispatch(AddUsersDate(undefined));
  dispatch(AddUsersStatus(''));
  dispatch(AddUsersPhoto(''));

  if (userId) {
    getUserDoc(userId)
      // Get found document
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          // Get data from document fields
          const firstName: string = snapshot.data()?.userInfo.firstName;
          const secondName: string = snapshot.data()?.userInfo.secondName;
          const birthday: number = snapshot.data()?.userInfo.birthday;
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
          getFollowingCount(userId!).then(
            (FollowingCount) =>
              FollowingCount && dispatch(AddUsersFollowingCount(FollowingCount))
          );

          // Get user info and set it to state
        }
      });
    getUserPhoto(userId).then((img) => {
      dispatch(AddUsersPhoto(img));
    });
  }
  const friends = getStorageItem('friends');

  // Check if there is array of friends in local storage
  if (friends) {
    // Get all friends
    if (friends.find((friend: any) => friend.user === userId)) {
      dispatch(AddUsersIsFriend(true));
    }
  }
  if (userId === getState().auth.userId) {
    dispatch(AddUsersIsFriend(true));
  }
  getFriendsCount(userId!).then(
    (FriendsCount) =>
      FriendsCount && dispatch(AddUsersFollowersCount(FriendsCount))
  );
};
