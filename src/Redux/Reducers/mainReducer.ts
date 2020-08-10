// Constants
import {
  ADD_FIRST_AND_SECOND_NAMES,
  ADD_USER_ID,
  ADD_USER_DATE,
} from '../Constants';
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
  date: string;
}

// ==== Initial state ====
const initialState: InitialStateInterface = {
  firstName: '',
  secondName: '',
  userId: '',
  date: '',
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

    case ADD_USER_DATE:
      return {
        ...state,
        date: payload,
      };

    default:
      return state;
  }
};
