// Constants
import { ADD_FIRST_AND_SECOND_NAMES, ADD_USER_DATE } from '../Constants';
// Actions
import { AddFirstAndSecondNamesActionInterface } from '../Actions/mainActions';

// ====TypeScript ====
type ActionInterfaces = AddFirstAndSecondNamesActionInterface;

export interface InitialStateInterface {
  firstName: string;
  secondName: string;
  date: string;
}

// ==== Initial state ====
const initialState: InitialStateInterface = {
  firstName: '',
  secondName: '',
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

    case ADD_USER_DATE:
      return {
        ...state,
        date: payload,
      };

    default:
      return state;
  }
};
