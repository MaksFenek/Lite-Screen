import React, { useEffect, useState } from 'react';
import './PostList.scss';

import Post from '../../components/Post/Post';
import { getPostThunk } from '../../Redux/Actions/postsActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/rootReducer';
import { IPost } from '../../Redux/Reducers/postsReducer';
import { getStorageItem } from '../../api/localstorageAPI';

import NoDataImg from '../../Icons/undraw_no_data_qbuo.svg';
import { getUsersPostsThunk } from '../../Redux/Actions/usersPostsActions';
import { likePost, unlikePost } from '../../api/postsAPI';
import { commentPost, deletePost } from '../../api/postsAPI';

export interface IPostList {
  author: string;
  type: 'single' | 'multiple';
  query?: string;
}

const PostList: React.FC<IPostList> = ({ author, type, query }) => {
  // Create selector
  const state = useSelector((store: RootReducerInterface) => store.posts.posts);
  const usersState = useSelector(
    (store: RootReducerInterface) => store.usersPosts.posts
  );

  // Create dispatch
  const dispatch = useDispatch();
  // Create state for posts
  const [posts, setPosts] = useState<IPost[]>();

  useEffect(() => {
    if (type === 'single') {
      // Get post from firebase
      dispatch(getPostThunk(author));
    } else if (type === 'multiple') {
      // Get post form firebase
      dispatch(getUsersPostsThunk(author, getStorageItem('friends')));
    }
  }, [dispatch, author, type]);

  useEffect(() => {
    if (type === 'single') {
      setPosts(state);
    }
  }, [state, type]);
  useEffect(() => {
    if (type === 'multiple') {
      setPosts(usersState);
    }
  }, [usersState, type]);

  return (
    <>
      {posts?.length === 0 && (
        <>
          <h3 className='NoPosts'>No posts</h3>
          <img src={NoDataImg} className='NoDataImg' alt='NoPhoto' />
        </>
      )}

      {posts?.map((post) => {
        const reg = new RegExp(query!, 'ig');
        if (post.content.match(reg)?.length) {
          return (
            <Post
              date={post.date}
              authorPhoto={post.authorPhoto}
              author={post.author}
              name={post.name}
              photo={post.photo}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              id={post.id}
              userId={author}
              likePost={likePost}
              unlikePost={unlikePost}
              key={post.date}
              commentPost={commentPost}
              deletePost={deletePost}
            />
          );
        } else if (!query) {
          return (
            <Post
              date={post.date}
              authorPhoto={post.authorPhoto}
              author={post.author}
              name={post.name}
              photo={post.photo}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              id={post.id}
              userId={author}
              likePost={likePost}
              unlikePost={unlikePost}
              key={post.date}
              commentPost={commentPost}
              deletePost={deletePost}
            />
          );
        }
      })}
    </>
  );
};

export default React.memo(PostList);
