// Redux
import { combineReducers } from 'redux';

// Another reducers import
import mainReducer, { InitialStateInterface } from './mainReducer';
import usersReducer, { InitialUsersStateInterface } from './usersReducer';

// ==== TypeScript ====
export interface RootReducerInterface {
  auth: InitialStateInterface;
  users: InitialUsersStateInterface;
}

const rootReducer = combineReducers<RootReducerInterface>({
  auth: mainReducer,
  users: usersReducer,
});
export default rootReducer;
