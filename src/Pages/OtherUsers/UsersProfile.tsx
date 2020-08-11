// react
import React, { useState } from 'react';

// Components
import UserNavbar from '../../Containers/User/UserNavbar';

// Style and material ui
import '../../Styles/OtherUsers/Users.scss';

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
  });

  if (userId) {
    // Get the users collection
    db.collection('users')
      .doc(userId)
      .get()
      .then((snapshot) => {
        if (userInfo.date === '') {
          if (snapshot.exists) {
            setUserInfo({
              firstName: snapshot.data()?.userInfo.firstName,
              secondName: snapshot.data()?.userInfo.secondName,
              date: snapshot.data()?.userInfo.birthday,
            });
          }
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
              <div className='img'></div>
            </div>
            <div className='info'>
              <div className='names'>
                <p>
                  First Name:
                  <span> {userInfo.firstName}</span>
                </p>
                <p>
                  Second Name:
                  <span> {userInfo.secondName}</span>
                </p>
              </div>
              <div className='dls'>
                <p>
                  Date:
                  <span> {userInfo.date}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
