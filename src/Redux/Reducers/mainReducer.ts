// Actions
import {
  ADD_FIRST_AND_SECOND_NAMES,
  AddFirstAndSecondNamesActionInterface,
} from '../Actions/mainActions';

// ====TypeScript ====
type ActionInterfaces = AddFirstAndSecondNamesActionInterface;

export interface InitialStateInterface {
  firstName: string;
  secondName: string;
  ages: null | number;
}

// ==== Initial state ====
const initialState: InitialStateInterface = {
  firstName: '',
  secondName: '',
  ages: null,
};

// ==== Reducer
export default (state = initialState, { type, payload }: ActionInterfaces) => {
  switch (type) {
    case ADD_FIRST_AND_SECOND_NAMES:
      return {
        ...state,
        firstName: payload.firstName,
        secondName: payload.secondName,
      };

    default:
      return state;
  }
};
