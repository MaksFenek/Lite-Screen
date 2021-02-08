import {
  firestore,
  getPostsCollection,
  getUserDoc,
  getUserPhotoRef,
} from './firebaseAPI';

export const createPost = (
  id: string,
  name: string,
  description: string,
  date: number,
  photo?: string
) => {
  // Check if description and photo exist
  if (description && photo) {
    getPostsCollection
      .add({
        userId: id,
        name,
        date,
        likes: [],
        photo,
        content: description,
        comments: [],
        id: `${new Date().getTime()}`,
      })
      .then((post) => {
        getUserDoc(id).update({
          posts: firestore.FieldValue.arrayUnion(post.id),
        });
      });
  } else if (description) {
    getPostsCollection
      .add({
        name,
        userId: id,
        date,
        likes: [],
        photo: '',
        content: description,
        comments: [],
        id: `${new Date().getTime()}`,
      })
      .then((post) => {
        getUserDoc(id).update({
          posts: firestore.FieldValue.arrayUnion(post.id),
        });
      });
  } else if (photo) {
    getPostsCollection
      .add({
        name,
        userId: id,
        date,
        likes: [],
        photo,
        content: '',
        comments: [],
        id: `${new Date().getTime()}`,
      })
      .then((post) => {
        getUserDoc(id).update({
          posts: firestore.FieldValue.arrayUnion(post.id),
        });
      });
  }
};

export const likePost = (postId: string, author: string) => {
  getPostsCollection
    .doc(postId)
    .update({ likes: firestore.FieldValue.arrayUnion(author) });
};

export const unlikePost = (postId: string, author: string) => {
  getPostsCollection
    .doc(postId)
    .update({ likes: firestore.FieldValue.arrayRemove(author) });
};

export const commentPost = (
  currentUserId: string,
  postId: string,
  text: string
) => {
  const date = new Date().getTime();

  getUserPhotoRef(currentUserId)
    .getDownloadURL()
    .then((authorPhoto) => {
      getPostsCollection.doc(postId).update({
        comments: firestore.FieldValue.arrayUnion({
          author: currentUserId,
          authorPhoto,
          commentId: date,
          date,
          text,
        }),
      });
    });
};

export const deletePost = (postId: string) => {
  getPostsCollection.doc(postId).delete();
};
