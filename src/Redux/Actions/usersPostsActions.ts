import { getPostsCollection, getUserPhoto } from '../../api/firebaseAPI';
import { IFriend, IUserPost } from '../../_Types/appTypes';
import { IPost } from '../Reducers/postsReducer';
import { GET_USERS_POST, CLEAN_USERS_POSTS } from '../Constants';

export const getUsersPost = (payload: IPost) => ({
  type: GET_USERS_POST,
  payload,
});

export const cleanUsersPosts = {
  type: CLEAN_USERS_POSTS,
};

export const getUsersPostsThunk = (author: string, friends: IFriend[]) => (
  dispatch: any
) => {
  dispatch(cleanUsersPosts);
  if (author) {
    if (friends) {
      // Get all friends
      friends.forEach((friend) => {
        // Check if there is such user in post collection
        if (getPostsCollection.doc(friend.user).get()) {
          // Get the user's post collection
          getPostsCollection
            .doc(friend.user)
            .get()
            .then((user) => {
              // Find post's author photo
              getUserPhoto(friend.user).then((url) => {
                // Take every post in posts array
                user
                  .data()
                  ?.posts.sort((a: any, b: any) => (a.id < b.id ? 1 : -1))
                  .forEach((post: IUserPost) => {
                    // Dispatch post in state
                    dispatch(
                      getUsersPost({
                        author: post.author,
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
                  });
              });
            });
        }
      });
    }
  }
};
