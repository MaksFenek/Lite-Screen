// react
import React from 'react';

// Components
import Sidebar from '../../Containers/User/Sidebar';
import UserNavbar from '../../Containers/User/UserNavbar';

// Style and material ui
import '../../Styles/User/Profile.scss';
import TextField from '@material-ui/core/TextField';

// Firebase
import { db } from '../../Firebase';

export default function Profile({ setUser, userId }: any) {
  // Get window width
  const width = +window.innerWidth;

  // Create state for user info
  const [userInfo, setUserInfo] = React.useState({
    firstName: '',
    secondName: '',
  });

  if (userInfo.secondName === '') {
    // Get user info from firebase
    //Choose collection Users
    db.collection('users')
      // Choose document by userId
      .doc(userId)
      // Get the info
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        // Set info in state
        setUserInfo({
          firstName: data?.userInfo.firstName,
          secondName: data?.userInfo.secondName,
        });
      });
  }

  // Handle actions
  const handleImg = (e: any) => {
    // Get file from input
    const file = e.currentTarget.files[0];
    let formData = new FormData();
    formData.append('myFile', file);
  };

  return (
    <>
      <UserNavbar setUser={setUser}></UserNavbar>
      <div className='container'>
        <div className='main'>
          <div className='content'>
            <div className='image'>
              <img
                src='../../Styles/Icons/undraw_young_and_happy_hfpe.png'
                alt=''
              />
              <input type='file' onChange={handleImg}></input>
            </div>
            <div className='info'>
              <div className='names'>
                <TextField
                  required
                  label='First name'
                  value={userInfo.firstName}
                />
                <TextField
                  required
                  label='Second name'
                  value={userInfo.secondName}
                />
              </div>
              <div className='dls'>
                <TextField required label='Age' />
                <TextField required label='Birthday' />
              </div>
            </div>
          </div>
          {width <= 1080 ? '' : <Sidebar></Sidebar>}
        </div>
      </div>
    </>
  );
}
