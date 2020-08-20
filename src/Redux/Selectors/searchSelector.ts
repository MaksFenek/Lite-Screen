import { InitialUsersStateInterface } from '../Reducers/searchReducer';

export const getUsersInSearchSelector = (state: InitialUsersStateInterface) =>
  state.users;
export const getUsersCountSelector = (state: InitialUsersStateInterface) =>
  state.count;
export const getUsersLoadedSelector = (state: InitialUsersStateInterface) =>
  state.loaded;
