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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';

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
      <Link to='/search'>
        <Tooltip title='Search'>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Link>

      <Tooltip title='Messages'>
        <IconButton>
          <MessageIcon />
        </IconButton>
      </Tooltip>
      <Link to='/'>
        <Tooltip title='News'>
          <IconButton>
            <LibraryBooksIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to={`/users/${auth.currentUser?.uid}`}>
        <Tooltip title='Profile'>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
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
        <Link to={`/${userId}`}>
          <MenuItem onClick={handleClose}>Edit profile</MenuItem>
        </Link>
        <Link to='/friends'>
          <MenuItem onClick={handleClose}> Friends </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}> Groups </MenuItem>
        <MenuItem onClick={handleClose}> Setting </MenuItem>
        <Link to='/' onClick={handleSignOut}>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Link>
      </Menu>
    </Navbar>
  );
}
