import { firestore, getPostsCollection, getUserDoc } from './firebaseAPI';

export const createPost = (
  id: string,
  name: string,
  description: string,
  date: string[],
  photo?: string
) => {
  // Check if description and photo exist
  if (description && photo) {
    getPostsCollection.add({
      userId:id,
      name,
      date,
      likes: [],
      photo,
      content: description,
      comments: [],
      id: `${new Date().getTime()}`,
    }).then((post)=>{
      getUserDoc(id).update({posts: firestore.FieldValue.arrayUnion(post.id)})
    })
    
  } else if (description) {
    getPostsCollection.add({
      name,
      userId:id,
      date,
      likes: [],
      photo:'',
      content: description,
      comments: [],
      id: `${new Date().getTime()}`,
    }).then((post)=>{
      getUserDoc(id).update({posts: firestore.FieldValue.arrayUnion(post.id)})
    })
  }
};
 
export const likePost = (postId:string, author:string) => {
  getPostsCollection.doc(postId).update({likes: firestore.FieldValue.arrayUnion(author)})
}