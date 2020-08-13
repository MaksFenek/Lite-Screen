// react
import React, { useState, useEffect } from 'react';

// Components
import UserNavbar from '../../Containers/User/UserNavbar';

// Style and material ui
import '../../Styles/OtherUsers/Users.scss';
import ProfileIcon from '../../Icons/nophoto.png';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';

// Redux

// Firebase
import { db } from '../../Firebase';

export default function UsersProfile() {
  // Create state for user ID
  const [userId, setUserId] = useState<undefined | string>(undefined);

  // Create state for user info
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    secondName: '',
    date: '',
    status: '',
  });
  useEffect(() => {
    setUserId(
      // Get pathname of the page and delele '/users/'
      document.location.pathname
        .split('')
        .filter((item, index) => index > 6 && item)
        .join('')
    );
    if (userId) {
      if (userInfo.firstName === '') {
        // Get the users collection
        db.collection('users')
          .doc(userId)
          .get()
          .then((snapshot) => {
            // Take an user object and check if the user is exist
            if (snapshot.exists) {
              setUserInfo({
                firstName: snapshot.data()?.userInfo.firstName,
                secondName: snapshot.data()?.userInfo.secondName,
                date: snapshot.data()?.userInfo.birthday,
                status: snapshot.data()?.userInfo.status,
              });
            }
          });
      }
    }
  }, [userId, userInfo.firstName]);

  return (
    <>
      <UserNavbar></UserNavbar>
      <div className='container'>
        <div className='main-users'>
          <div className='content bg'>
            <div className='image'>
              <img src={ProfileIcon} alt='userPhoto' height='200' width='200' />{' '}
            </div>
            <div className='info'>
              <div className='names'>
                <h3>
                  {userInfo.firstName} {userInfo.secondName}
                </h3>
                <span>Offline</span>
              </div>
              {userInfo.status ? (
                <div className='status'>
                  <p>{userInfo.status}</p>
                </div>
              ) : null}

              <div className='people'>
                <div className='friends'>
                  <p>Friends</p>
                </div>
                <div className='subscribers'>
                  <p>Subscribers</p>
                </div>
                <div className='groups'>
                  <p>Groups</p>
                </div>
              </div>
            </div>
          </div>
          <div className='second-row'>
            <Button className='subscribe' variant='contained' color='primary'>
              Subscribe
            </Button>
            <div className='search'>
              <div className='search-icon'>
                <SearchIcon />
              </div>
              <InputBase
                className='search-input'
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className='column'>
              <Button className='messages' variant='contained' color='primary'>
                Messages
              </Button>
              <div className='dls'>
                <div className='date'>Date: {userInfo.date}</div>
              </div>
            </div>

            <div className='posts'></div>
          </div>
        </div>
      </div>
    </>
  );
}
