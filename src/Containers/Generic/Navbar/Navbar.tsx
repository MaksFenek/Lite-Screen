// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Styles and material ui
import './Navbar.scss';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MessageIcon from '@material-ui/icons/Message';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';

// API
import { auth } from '../../../api/firebaseAPI';

// ==== TypeScript ====
interface INavbarChildren {
  children?: React.ReactNode;
  user?: string;
}

const Navbar: React.FC<INavbarChildren> = ({ children, user }) => {
  const [userId, setUserId] = useState<undefined | string>(undefined);

  // Create state for menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect((): void => {
    setUserId(user);
  }, [user]);

  // Handle for sign out
  const handleSignOut = (): void => {
    auth.signOut();
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <nav className='nav'>
      <div className='container'>
        <div className='navbar'>
          <div className='navbar-logo'>
            <Icon />
          </div>
          <div className={userId ? 'user-navbar' : 'auth-navbar'}>
            {userId ? (
              <>
                <Link to='/search'>
                  <Tooltip title='Search'>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link to='/messages'>
                  <Tooltip title='Messages'>
                    <IconButton>
                      <MessageIcon />
                    </IconButton>
                  </Tooltip>
                </Link>

                <Link to='/'>
                  <Tooltip title='News'>
                    <IconButton>
                      <LibraryBooksIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link to={`/users/${userId}`}>
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
                  <Link to={`/following/${userId}`}>
                    <MenuItem onClick={handleClose}> Friends </MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}> Groups </MenuItem>
                  <MenuItem onClick={handleClose}> Setting </MenuItem>
                  <Link to='/' onClick={handleSignOut}>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Link>
                </Menu>
              </>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);

function Icon() {
  return (
    <svg
      height='48'
      viewBox='0 0 64 64'
      width='48'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Tempered_Glass-Smartphone' data-name='Tempered Glass-Smartphone'>
        <rect fill='#3d9ae2' height='54' rx='4' width='30' x='5' y='7' />
        <path
          d='m35 11v46h-4a3.995 3.995 0 0 1 -4-4v-46h4a4 4 0 0 1 4 4z'
          fill='#1e81ce'
        />
        <path
          d='m26 7v3a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1-1v-3z'
          fill='#ff9811'
        />
        <path
          d='m59 7v46a4 4 0 0 1 -4 4h-22a3.995 3.995 0 0 1 -4-4v-46a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4z'
          fill='#5aaae7'
        />
        <path
          d='m50 3v3a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1-1v-3z'
          fill='#e6e7e8'
        />
        <circle cx='44' cy='51' fill='#e6e7e8' r='2' />
        <path
          d='m35 40-6 6v7a4.025 4.025 0 0 0 1.17 2.83l4.83-4.83 24-24v-11z'
          fill='#96c8ef'
        />
        <path d='m35 34-6 6v6l6-6 24-24v-6z' fill='#78b9eb' />
        <circle cx='20' cy='55' fill='#ff9811' r='2' />
      </g>
    </svg>
  );
}
