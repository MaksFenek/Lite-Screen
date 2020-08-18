// Constants
import {
  ADD_FIRST_AND_SECOND_NAMES,
  ADD_LOADED,
  ADD_USER_DATE,
  ADD_USER_STATUS,
  ADD_USER_ID,
  ADD_USER_PHOTO,
} from '../Constants';
// Actions

// ====TypeScript ====

export interface InitialStateInterface {
  userId: string;
  firstName: string;
  secondName: string;
  date: string;
  status: string;
  photo: string;
  loaded: boolean;
}

// ==== Initial state ====
const initialState: InitialStateInterface = {
  userId: '',
  firstName: '',
  secondName: '',
  date: '',
  status: '',
  photo: '',
  loaded: false,
};

// Get first name and second name from firebase

// ==== Reducer
export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case ADD_FIRST_AND_SECOND_NAMES:
      return {
        ...state,
        firstName: payload.firstName,
        secondName: payload.secondName,
      };

    case ADD_USER_DATE:
      return {
        ...state,
        date: payload,
      };

    case ADD_USER_STATUS:
      return {
        ...state,
        status: payload,
      };

    case ADD_LOADED:
      return {
        ...state,
        loaded: payload,
      };

    case ADD_USER_ID:
      return {
        ...state,
        userId: payload,
      };

    case ADD_USER_PHOTO:
      return {
        ...state,
        photo: payload,
      };

    default:
      return state;
  }
};
