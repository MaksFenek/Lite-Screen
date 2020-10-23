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
  if (getPostsCollection.where('userId','==', author).get()) {
    // Get user post collection
    getPostsCollection.where('userId','==', author).get()
      .then((user) => {
        // Get user photo
        getUserPhoto(author).then((url) => {
          // Take every post in posts array
          user.docs.sort((a: any, b: any) => (a.data().id < b.data().id ? 1 : -1))
            .forEach((post:any) => {              
              if (
                getState().posts.posts.find(
                  (item: IUserPost) => item.id !== post.data().id
                ) ||
                getState().posts.posts.length === 0
              ) {
                // Dispatch post in state
                dispatch(
                  getPost({
                    author: post.data().userId,
                    content: post.data().content,
                    authorPhoto: url,
                    comments: post.data().comments,
                    date: post.data().date,
                    likes: post.data().likes,
                    photo: post.data().photo,
                    name: post.data().name,
                    id: post.id,
                  })
                );
              }
            });
        });
      });
  }
};
