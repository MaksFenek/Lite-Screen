// react
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Style and material ui
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';

// Redux

// Firebase
import { db, storageRef, auth } from '../../Firebase';
import { AddFriend } from '../../lib/Functions';
import { IUserInfo, IFriend } from '../../_Types/appTypes';

export default function UsersProfile() {
  // Create state for user ID
  const [userId, setUserId] = useState<undefined | string>(undefined);

  // Create state for user info
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    firstName: '',
    secondName: '',
    birthday: '',
    status: '',
  });

  // Create photo for user photo
  const [photo, setPhoto] = useState<string>('');

  // Create state for initialize a friend
  const [isFriend, setIsFriend] = useState<boolean>(false);

  let location = useLocation();

  useEffect(() => {
    // Check if there is array of friends in local storage
    if (localStorage.getItem('friends')) {
      // Get all friends
      JSON.parse(localStorage.getItem('friends')!).forEach((friend: any) => {
        // Set flag {isFriend}
        friend.name === userId ? setIsFriend(true) : setIsFriend(false);
      });
    }
    // Get current user document in firebase
    db.collection('users')
      .doc(auth.currentUser?.uid)
      .get()
      .then((user) => {
        if (user.exists) {
          if (user.data()?.friends) {
            if (
              user
                .data()
                ?.friends.find((friend: IFriend) => friend.user === userId)
            ) {
              setIsFriend(true);
            }
          }
          if (userId === auth.currentUser?.uid) {
            setIsFriend(true);
          }
        }
      });

    if (userId) {
      const userPhotoRef = storageRef.child(`${userId}`).child('photo');

      // Get user info and set it to state
      userPhotoRef.getDownloadURL().then((img) => {
        setPhoto(img);
      });
    }

    setUserId(
      // Get pathname of the page and delele '/users/'
      document.location.pathname
        .split('')
        .filter((item: string, index: number) => index > 6 && item)
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
                birthday: snapshot.data()?.userInfo.birthday,
                status: snapshot.data()?.userInfo.status,
              });
            }
          });
      }
    }
  }, [userId, userInfo, location]);

  useEffect(() => {
    setUserInfo({ firstName: '', secondName: '', birthday: '', status: '' });
  }, [location]);

  return (
    <>
      <div className='container'>
        <div className='main-users'>
          <div className='content bg'>
            <div className='image'>
              <div className='user-image'>
                <img src={photo} alt='userPhoto' />
              </div>
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
            {isFriend ? (
              <Button
                className='subscribe'
                variant='contained'
                color='default'
                disabled
              >
                Friend
              </Button>
            ) : (
              <Button
                name={userId}
                value={photo}
                onClick={AddFriend}
                className='subscribe'
                variant='contained'
                color='primary'
              >
                Subscribe
              </Button>
            )}

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
                <div className='date'>Date: {userInfo.birthday}</div>
              </div>
            </div>

            <div className='posts'></div>
          </div>
        </div>
      </div>
    </>
  );
}
