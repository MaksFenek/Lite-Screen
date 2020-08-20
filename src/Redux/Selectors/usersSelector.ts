import { IUsersInitialState } from '../Reducers/usersReducer';

export const getUserFirstNameSelector = (state: IUsersInitialState) =>
  state.firstName;

export const getUserSecondNameSelector = (state: IUsersInitialState) =>
  state.secondName;

export const getUserDateSelector = (state: IUsersInitialState) => state.date;

export const getUserStatusSelector = (state: IUsersInitialState) =>
  state.status;

export const getUserPhotoSelector = (state: IUsersInitialState) => state.photo;
