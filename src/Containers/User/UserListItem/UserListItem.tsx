// React
import React from 'react';
import { Link } from 'react-router-dom';

// Styles Material ui
import './UserListItem.scss';
import AddIcon from '@material-ui/icons/Add';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// Utilits
import { AddFriend, DeleteFriend } from '../../../lib/Functions';

// ==== Typescript ====
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
          <IconButton value={photo} name={id} onClick={DeleteFriend}>
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton name={id} value={photo} onClick={AddFriend}>
            <AddIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserListItem);
