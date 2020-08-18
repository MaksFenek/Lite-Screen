import {
  ADD_USERS_FIRST_AND_SECOND_NAMES,
  ADD_USERS_DATE,
  ADD_USERS_STATUS,
  ADD_USERS_PHOTO,
} from '../Constants';

export interface IUsersInitialState {
  firstName: string;
  secondName: string;
  date: string;
  status: string;
  photo: string;
}

const initialState: IUsersInitialState = {
  firstName: '',
  secondName: '',
  date: '',
  status: '',
  photo: '',
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

    default:
      return state;
  }
};
