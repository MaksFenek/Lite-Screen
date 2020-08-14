// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Styles and material ui
import '../../Styles/User/Friends.scss';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default function Friends() {
  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    // Get all friends from local storage
    setUsers(JSON.parse(localStorage.getItem('friends')!));
  }, []);
  return (
    <div className='container'>
      <section className='main-friends-content'>
        <div className='main-friends'>
          <div className='search'>
            <InputBase
              className='search-input'
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
            />
            <div className='search-icon'>
              <SearchIcon />
            </div>
          </div>
          <div className='friends'>
            {users !== null
              ? users!.map((user: any, index: any) => {
                  return (
                    <div className='post' key={index}>
                      <Link to={`/users/${user.user}`}>
                        <div className='user-image'>
                          <img
                            className='post-img'
                            src={user.photo}
                            alt='userPhoto'
                          />
                        </div>
                      </Link>
                      <div className='post-name'>
                        <h4>{user.name}</h4>
                      </div>

                      <div className='post-btn'>
                        <IconButton>
                          <MailOutlineIcon />
                        </IconButton>
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
        <div className='filters'></div>
      </section>
    </div>
  );
}
