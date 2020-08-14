import { ADD_USER_IN_SEARCH, ADD_LOADED } from '../Constants';

export interface InitialUsersStateInterface {
  posts: any;
  count: number;
  loaded: boolean;
}

const initialState: InitialUsersStateInterface = {
  posts: [],
  count: 0,
  loaded: false,
};

export default (
  state = initialState,
  { type, payload }: any
): InitialUsersStateInterface => {
  switch (type) {
    case ADD_USER_IN_SEARCH:
      return Object.assign({}, state, {
        posts: [...state.posts, { name: payload.name, link: payload.link }],
        count: 1 + state.count,
      });

    case ADD_LOADED:
      return { ...state, loaded: true };

    default:
      return state;
  }
};
