// Constants
import {
  ADD_FIRST_AND_SECOND_NAMES,
  ADD_USER_DATE,
  ADD_USER_STATUS,
} from '../Constants';
// Actions
import { AddFirstAndSecondNamesActionInterface } from '../Actions/mainActions';

// ====TypeScript ====
type ActionInterfaces = AddFirstAndSecondNamesActionInterface;

export interface InitialStateInterface {
  firstName: string;
  secondName: string;
  date: string;
  status: string;
}

// ==== Initial state ====
const initialState: InitialStateInterface = {
  firstName: '',
  secondName: '',
  date: '',
  status: '',
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

    default:
      return state;
  }
};
