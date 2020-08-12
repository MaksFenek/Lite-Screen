// react
import React, { useState } from 'react';

// Components
import UserNavbar from '../../Containers/User/UserNavbar';

// Style and material ui
import '../../Styles/OtherUsers/Users.scss';
import ProfileIcon from '../../Icons/nophoto.png';

// Redux

// Firebase
import { db } from '../../Firebase';

export default function UsersProfile() {
  // Create state for user ID
  const [userId, setUserId] = useState<undefined | string>(
    // Get pathname of the page and delele '/'
    document.location.pathname
      .split('')
      .filter((item, index) => index > 6 && item)
      .join('')
  );

  // Create state for user info
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    secondName: '',
    date: '',
    status: '',
  });

  if (userId) {
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

  return (
    <>
      <UserNavbar></UserNavbar>
      <div className='container'>
        <div className='main'>
          <div className='content bg'>
            <div className='image'>
              <img src={ProfileIcon} alt='userPhoto' height='200' width='200' />{' '}
            </div>
            <div className='info'>
              <div className='names'>
                <h3>
                  {userInfo.firstName} {userInfo.secondName}
                </h3>
              </div>
              <div className='status'>
                <p>{userInfo.status}</p>
              </div>

              <div className='dls'>
                <h3>{userInfo.date}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
