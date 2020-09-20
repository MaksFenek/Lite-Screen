// Redux
import { applyMiddleware, combineReducers } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';

// Another reducers import
import mainReducer, { InitialStateInterface } from './currentUserReducer';
import searchReducer, { InitialUsersStateInterface } from './searchReducer';
import usersReducer, { IUsersInitialState } from './usersReducer';
import chatsReducer, { IInitialChatsState } from './chatsReducer';
import postsReducer, { IPostsState } from './postsReducer';
import usersPostsReducer from './usersPostsReducer';

// ==== TypeScript ====
export interface RootReducerInterface {
  auth: InitialStateInterface;
  search: InitialUsersStateInterface;
  users: IUsersInitialState;
  chats: IInitialChatsState;
  posts: IPostsState;
  usersPosts: IPostsState;
}

const rootReducer = combineReducers<RootReducerInterface>({
  auth: mainReducer,
  search: searchReducer,
  users: usersReducer,
  chats: chatsReducer,
  posts: postsReducer,
  usersPosts: usersPostsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
