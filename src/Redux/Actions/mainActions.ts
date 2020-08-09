// Action constants
import { ADD_FIRST_AND_SECOND_NAMES } from '../Constants';

// ==== TypeScript ====

export interface AddFirstAndSecondNamesActionInterface {
  type: typeof ADD_FIRST_AND_SECOND_NAMES;
  payload: {
    firstName: string;
    secondName: string;
  };
}

// ==== Actions ====

export const AddFirstAndSecondNamesAction = ({
  firstName,
  secondName,
}: {
  firstName: string;
  secondName: string;
}): AddFirstAndSecondNamesActionInterface => ({
  type: ADD_FIRST_AND_SECOND_NAMES,
  payload: {
    firstName,
    secondName,
  },
});
