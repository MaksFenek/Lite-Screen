import {
  ADD_USERS_FIRST_AND_SECOND_NAMES,
  ADD_USERS_DATE,
  ADD_USERS_STATUS,
  ADD_USERS_PHOTO,
  ADD_USERS_FOLLOWERS_COUNT,
  ADD_USERS_FOLLOWING_COUNT,
  ADD_USERS_IS_FRIEND,
} from '../Constants';

export interface IUsersInitialState {
  firstName: string;
  secondName: string;
  date: string;
  status: string;
  photo: string;
  isFriend: boolean;
  followersCount: number;
  followingCount: number;
}

const initialState: IUsersInitialState = {
  firstName: '',
  secondName: '',
  date: '',
  status: '',
  photo: '',
  isFriend: false,
  followersCount: 0,
  followingCount: 0,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case ADD_USERS_FIRST_AND_SECOND_NAMES:
      return {
        ...state,
        firstName: payload.firstName,
        secondName: payload.secondName,
      };

    case ADD_USERS_DATE:
      return {
        ...state,
        date: payload,
      };

    case ADD_USERS_STATUS:
      return {
        ...state,
        status: payload,
      };

    case ADD_USERS_PHOTO:
      return {
        ...state,
        photo: payload,
      };

    case ADD_USERS_FOLLOWERS_COUNT:
      return {
        ...state,
        followersCount: payload,
      };

    case ADD_USERS_FOLLOWING_COUNT:
      return {
        ...state,
        followingCount: payload,
      };

    case ADD_USERS_IS_FRIEND:
      return {
        ...state,
        isFriend: payload,
      };

    default:
      return state;
  }
};
