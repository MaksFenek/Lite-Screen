// Redux
import { combineReducers } from 'redux';

// Another reducers import
import mainReducer, { InitialStateInterface } from './mainReducer';

// ==== TypeScript ====
export interface RootReducerInterface {
  auth: InitialStateInterface;
}

const rootReducer = combineReducers<RootReducerInterface>({
  auth: mainReducer,
});
export default rootReducer;
