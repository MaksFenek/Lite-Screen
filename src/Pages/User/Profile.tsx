// react
import React, { useState } from 'react';

// Components
import Sidebar from '../../Containers/User/Sidebar';
import UserNavbar from '../../Containers/User/UserNavbar';

// Style and material ui
import '../../Styles/User/Profile.scss';
import TextField from '@material-ui/core/TextField';

import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/rootReducer';

export default function Profile() {
  const useSelector: TypedUseSelectorHook<RootReducerInterface> = useReduxSelector;
  const state = useSelector((store) => store.auth);

  // Get window width
  const width = +window.innerWidth;

  // Create state for user info
  const [userInfo, setUserInfo] = useState({
    firstName: state.firstName,
    secondName: state.secondName,
  });

  // Handle actions
  const handleImg = (e: any) => {
    // Get file from input
    const file = e.currentTarget.files[0];
    let formData = new FormData();
    formData.append('myFile', file);
  };

  return (
    <>
      <UserNavbar></UserNavbar>
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
                  type='text'
                  required
                  label='First name'
                  value={userInfo.firstName}
                />
                <TextField
                  type='text'
                  required
                  label='Second name'
                  value={userInfo.secondName}
                />
              </div>
              <div className='dls'>
                <TextField
                  type='date'
                  required
                  label='Birthday'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
          </div>
          {width <= 1080 ? '' : <Sidebar></Sidebar>}
        </div>
      </div>
    </>
  );
}
