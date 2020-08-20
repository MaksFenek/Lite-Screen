// Redux
import { applyMiddleware, combineReducers } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';

// Another reducers import
import mainReducer, { InitialStateInterface } from './currentUserReducer';
import searchReducer, { InitialUsersStateInterface } from './searchReducer';
import usersReducer, { IUsersInitialState } from './usersReducer';

// ==== TypeScript ====
export interface RootReducerInterface {
  auth: InitialStateInterface;
  search: InitialUsersStateInterface;
  users: IUsersInitialState;
}

const rootReducer = combineReducers<RootReducerInterface>({
  auth: mainReducer,
  search: searchReducer,
  users: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
