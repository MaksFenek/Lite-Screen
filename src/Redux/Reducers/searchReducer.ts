import { ADD_USER_IN_SEARCH, ADD_USER_SEARCH_LOADED } from '../Constants';

interface IUsers {
  name: string;
  id: string;
  photo: string;
}

export interface InitialUsersStateInterface {
  users: IUsers[];
  count: number;
  loaded: boolean;
}

const initialState: InitialUsersStateInterface = {
  users: [],
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
        users: [
          ...state.users,
          { name: payload.name, id: payload.link, photo: payload.photo },
        ],
        count: 1 + state.count,
      });

    case ADD_USER_SEARCH_LOADED:
      return { ...state, loaded: true };

    default:
      return state;
  }
};
