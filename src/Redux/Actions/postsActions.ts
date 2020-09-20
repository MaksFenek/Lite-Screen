import { getPostsCollection, getUserPhoto } from '../../api/firebaseAPI';
import { IPost } from '../../components/Post/Post';
import { IUserPost } from '../../_Types/appTypes';
import { GET_POST, CLEAN_POSTS } from '../Constants';

export const getPost = (payload: IPost) => ({
  type: GET_POST,
  payload,
});

export const cleanPosts = {
  type: CLEAN_POSTS,
};

export const getPostThunk = (author: string) => (
  dispatch: any,
  getState: any
) => {
  // Clean the posts state
  dispatch(cleanPosts);
  // Check if user have any posts
  if (getPostsCollection.doc(author).get()) {
    // Get user post collection
    getPostsCollection
      .doc(author)
      .get()
      .then((user) => {
        // Get user photo
        getUserPhoto(author).then((url) => {
          // Take every post in posts array
          user
            .data()
            ?.posts.sort((a: any, b: any) => (a.id < b.id ? 1 : -1))
            .forEach((post: IUserPost) => {
              if (
                getState().posts.posts.find(
                  (item: IUserPost) => item.id !== post.id
                ) ||
                getState().posts.posts.length === 0
              ) {
                // Dispatch post in state
                dispatch(
                  getPost({
                    author: user.id,
                    content: post.content,
                    authorPhoto: url,
                    comments: post.comments,
                    date: post.date,
                    likes: post.likes,
                    photo: post.photo,
                    name: post.name,
                    id: post.id,
                  })
                );
              }
            });
        });
      });
  }
};
