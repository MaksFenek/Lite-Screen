// React
import React from 'react';
import { Link } from 'react-router-dom';

// Styles Material ui
import './UserListItem.scss';
import AddIcon from '@material-ui/icons/Add';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';

// API
import { AddFriend, DeleteFriend } from '../../api/friendsAPI';
import { getUserPhoto } from '../../api/firebaseAPI';
import { createChat } from '../../api/messagesAPI';

// ==== Typescript ====
interface IUserListItem {
  isFriend?: boolean;
  name: string;
  id: string;
}

const UserListItem: React.FC<IUserListItem> = ({ id, name, isFriend }) => {
  const [photo, setPhoto] = React.useState<string>('');
  getUserPhoto(id).then((url) => {
    setPhoto(url);
  });
  return (
    <div className='post'>
      <Link to={`/users/${id}`}>
        <Avatar src={photo} className='user-image' />
      </Link>
      <div className='post-name'>
        <h4>{name}</h4>
      </div>

      <div className='post-btn'>
        <Link to={`/messages/${id}`}>
          <IconButton name={id} onClick={createChat}>
            <MailOutlineIcon />
          </IconButton>
        </Link>
        {isFriend !== undefined &&
          (isFriend ? (
            <IconButton value={photo} name={id} onClick={DeleteFriend}>
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton name={id} value={photo} onClick={AddFriend}>
              <AddIcon />
            </IconButton>
          ))}
      </div>
    </div>
  );
};

export default React.memo(UserListItem);
