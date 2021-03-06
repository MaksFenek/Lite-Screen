import { GET_USERS_POST, CLEAN_USERS_POSTS } from '../Constants';

export interface IPost {
  photo: string;
  authorPhoto: string;
  author: string;
  name: string;
  date: number;
  likes: number;
  comments: any[];
  content: string;
  id: string;
}

export interface IPostsState {
  posts: IPost[];
}

const initialState: IPostsState = {
  posts: [],
};

export default (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_USERS_POST:
      return Object.assign({}, state, {
        posts: [
          ...state.posts,
          {
            name: payload.name,
            photo: payload.photo,
            authorPhoto: payload.authorPhoto,
            author: payload.author,
            date: payload.date,
            content: payload.content,
            likes: payload.likes,
            comments: payload.comments,
            id: payload.id,
          },
        ],
      });
    case CLEAN_USERS_POSTS:
      return {
        posts: [],
      };

    default:
      return state;
  }
};
