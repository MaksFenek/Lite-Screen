// Action constants
import {
  ADD_FIRST_AND_SECOND_NAMES,
  ADD_USER_DATE,
  ADD_USER_STATUS,
} from '../Constants';

// ==== TypeScript ====

export interface AddFirstAndSecondNamesActionInterface {
  type: typeof ADD_FIRST_AND_SECOND_NAMES;
  payload: {
    firstName: string;
    secondName: string;
  };
}

export interface AddUserDateInterface {
  type: typeof ADD_USER_DATE;
  payload: string | undefined;
}

export interface AddUserStatusInterface {
  type: typeof ADD_USER_STATUS;
  payload: string | undefined;
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

export const AddUserDate = (date: string | undefined) => ({
  type: ADD_USER_DATE,
  payload: date,
});

export const AddUserStatus = (status: string | undefined) => ({
  type: ADD_USER_STATUS,
  payload: status,
});
