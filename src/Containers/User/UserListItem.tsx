import React from 'react';
import { Link } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { IconButton } from '@material-ui/core';
import { AddFriend, DeleteFriend } from '../../lib/Functions';
import CloseIcon from '@material-ui/icons/Close';

interface IUserListItem {
  isFriend: boolean;
  name: string;
  id: string;
  photo: string;
}

const UserListItem: React.FC<IUserListItem> = (props) => {
  const id = props.id;
  const name = props.name;
  const photo = props.photo;
  const isFriend = props.isFriend;

  return (
    <div className='post'>
      <Link to={`/users/${id}`}>
        <div className='user-image'>
          <img className='post-img' src={photo} alt='userPhoto' />
        </div>
      </Link>
      <div className='post-name'>
        <h4>{name}</h4>
      </div>

      <div className='post-btn'>
        <IconButton>
          <MailOutlineIcon />
        </IconButton>
        {isFriend ? (
          <IconButton name={id} value={photo} onClick={AddFriend}>
            <AddIcon />
          </IconButton>
        ) : (
          <IconButton value={photo} name={name} onClick={DeleteFriend}>
            <CloseIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserListItem);
