// React
import React from 'react';
import { Link } from 'react-router-dom';

// Styles and material ui
import './UserChatItem.scss';
import Avatar from '@material-ui/core/Avatar';

// ==== Typescript ====
interface IChatItem {
  name: string;
  id: string;
  photo: string;
}

const UserChatItem: React.FC<IChatItem> = ({ id, photo, name }) => {
  return (
    <Link to={`/messages/${id}`}>
      <div className='user-chat'>
        <Link to={`/users/${id}`}>
          <Avatar src={photo} className='user-image' />
        </Link>
        <div className='user-chat-content'>
          <div className='user-chat-name'>
            <h4>{name}</h4>
          </div>
          <div className='user-chat-last-message'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Blanditiis, quod!
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserChatItem;
