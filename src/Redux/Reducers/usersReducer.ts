import { ADD_USER_IN_SEARCH, ADD_LOADED } from '../Constants';

export interface InitialUsersStateInterface {
  users: any;
  count: number;
  loaded: boolean;
  photo: string;
}

const initialState: InitialUsersStateInterface = {
  users: [],
  count: 0,
  loaded: false,
  photo: '',
};

export default (
  state = initialState,
  { type, payload }: any
): InitialUsersStateInterface => {
  switch (type) {
    case ADD_USER_IN_SEARCH:
      return Object.assign({}, state, {
        users: [
          ...state.users,
          { name: payload.name, link: payload.link, photo: payload.photo },
        ],
        count: 1 + state.count,
      });

    case ADD_LOADED:
      return { ...state, loaded: true };

    default:
      return state;
  }
};
