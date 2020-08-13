// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//Components
import Navbar from '../../Containers/Navbar';

// Style and material ui
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//Redux

// Firebase
import { auth } from '../../Firebase';

export default function UserNavbar() {
  const [userId, setUserId] = useState<undefined | string>(undefined);

  useEffect(() => {
    setUserId(auth.currentUser?.uid);
  }, []);

  // Handle for sign out
  const handleSignOut = () => {
    auth.signOut();
  };

  // Create state for menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar>
      <IconButton>
        <MessageIcon />
      </IconButton>
      <IconButton>
        <NotificationsIcon />
      </IconButton>
      <Link to='/'>
        <IconButton>
          <LibraryBooksIcon />
        </IconButton>
      </Link>
      <Link to={`/users/${auth.currentUser?.uid}`}>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Link>
      <IconButton
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        keepMounted
        id='simple-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`/${userId}`}> Profile </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}> Friends </MenuItem>
        <MenuItem onClick={handleClose}> Groups </MenuItem>
        <MenuItem onClick={handleClose}> Setting </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link to='/' onClick={handleSignOut}>
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </Navbar>
  );
}
