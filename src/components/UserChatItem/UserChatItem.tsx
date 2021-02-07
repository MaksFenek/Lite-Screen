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
  lastMessage?: string;
}

const UserChatItem: React.FC<IChatItem> = ({
  id,
  photo,
  name,
  lastMessage,
}) => {
  return (
    <Link to={`/messages/${id}`}>
      <div className='user-chat'>
        <Link to={`/users/${id}`}>
          <Avatar
            src={photo}
            className='user-image'
            imgProps={{ 'aria-label': 'avatar' }}
          />
        </Link>
        <div className='user-chat-content'>
          <div className='user-chat-name'>
            <h4 aria-label='user-name'>{name}</h4>
          </div>
          {lastMessage && <p aria-label='last-message'>{lastMessage}</p>}
        </div>
      </div>
    </Link>
  );
};

export default React.memo(UserChatItem);
