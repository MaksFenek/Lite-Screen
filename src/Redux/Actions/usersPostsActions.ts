import { getPostsCollection, getUserPhoto } from '../../api/firebaseAPI';
import { IFriend } from '../../_Types/appTypes';
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
        if (getPostsCollection.where('userId','==', friend.user).get()) {
          // Get the user's post collection
          getPostsCollection.where('userId','==', friend.user).get()
            .then((user) => {
              // Find post's author photo
              getUserPhoto(friend.user).then((url) => {
                // Take every post in posts array
                user.docs.sort((a: any, b: any) => (a.data().id < b.data().id ? 1 : -1))
                  .forEach((post:any) => {
                    // Dispatch post in state
                    dispatch(
                      getUsersPost({
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
                  });
              });
            });
        }
      });
    }
  }
};
