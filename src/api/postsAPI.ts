import { firestore, getPostsCollection } from './firebaseAPI';

export const createPost = (
  id: string,
  name: string,
  description: string,
  date: string[],
  photo?: string
) => {
  // Check if description and photo exist
  if (description && photo) {
    // Update post document and there a new post
    getPostsCollection.doc(id).update({
      posts: firestore.FieldValue.arrayUnion({
        name,
        date,
        likes: 0,
        photo,
        content: description,
        comments: [],
        id: `${new Date().getTime()}`,
      }),
    });
  } else if (description) {
    getPostsCollection.doc(id).update({
      posts: firestore.FieldValue.arrayUnion({
        name,
        date,
        likes: 0,
        photo: '',
        content: description,
        comments: [],
        id: `${new Date().getTime()}`,
      }),
    });
  }
};
