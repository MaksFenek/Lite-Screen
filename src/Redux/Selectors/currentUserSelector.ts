import { InitialStateInterface } from '../Reducers/currentUserReducer';

export const getCurrentUserFirstNameSelector = (state: InitialStateInterface) =>
  state.firstName;

export const getCurrentUserSecondNameSelector = (
  state: InitialStateInterface
) => state.secondName;

export const getCurrentUserDateSelector = (state: InitialStateInterface) =>
  state.date;

export const getCurrentUserStatusSelector = (state: InitialStateInterface) =>
  state.status;

export const getCurrentUserPhotoSelector = (state: InitialStateInterface) =>
  state.photo;

export const getCurrentUserIdSelector = (state: InitialStateInterface) =>
  state.userId;
