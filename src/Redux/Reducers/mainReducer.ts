// Constants
import { ADD_FIRST_AND_SECOND_NAMES, ADD_USER_ID } from '../Constants';
// Actions
import {
  AddFirstAndSecondNamesActionInterface,
  AddUserIdInterface,
} from '../Actions/mainActions';

// ====TypeScript ====
type ActionInterfaces =
  | AddFirstAndSecondNamesActionInterface
  | AddUserIdInterface;

export interface InitialStateInterface {
  firstName: string;
  secondName: string;
  userId: string;
}

// ==== Initial state ====
const initialState: InitialStateInterface = {
  firstName: '',
  secondName: '',
  userId: '',
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

    case ADD_USER_ID:
      return {
        ...state,
        userId: payload,
      };

    default:
      return state;
  }
};
