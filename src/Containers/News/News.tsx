// React
import React from 'react';
import PostList from '../PostList/PostList';

// Styles and material ui
import './News.scss';
interface IMain {
  id: string | undefined;
}

const Main: React.FC<IMain> = ({ id }) => {
  return (
    <>
      <div className='container'>
        <div className='main'>
          <div className='main-content'>
            {id && <PostList author={id} type='multiple' />}
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
