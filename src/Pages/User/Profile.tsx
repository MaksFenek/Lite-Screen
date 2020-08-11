// react
import React, { useState, useRef } from 'react';

// Components
import UserNavbar from '../../Containers/User/UserNavbar';
import ImageUploader from 'react-images-upload';

// Style and material ui
import '../../Styles/User/Profile.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Redux
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/rootReducer';
import {
  AddFirstAndSecondNamesAction,
  AddUserDate,
} from '../../Redux/Actions/mainActions';

// Firebase
import { db, auth } from '../../Firebase';

export default function Profile() {
  const useSelector: TypedUseSelectorHook<RootReducerInterface> = useReduxSelector;
  const state = useSelector((store) => store.auth);

  // Create dispatch
  const dispatch = useDispatch();

  // Refs
  const firstNameRef = useRef<HTMLInputElement>(null);
  const secondNameRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);

  // Create state for user info
  const [userInfo, setUserInfo] = useState({
    firstName: state.firstName,
    secondName: state.secondName,
    date: state.date,
  });

  // Handle actions
  const handleImg = (picture: any) => {
    // Get file from input
  };

  // Handle actions
  const handleClick = () => {
    // Get user info from inputs
    const firstName = firstNameRef.current!.value;
    const secondName = secondNameRef.current!.value;
    const birthday = birthdayRef.current!.value;

    // Set info in store
    dispatch(AddFirstAndSecondNamesAction({ firstName, secondName }));
    dispatch(AddUserDate(birthday));

    // Set info in firebase
    db.collection('users').doc(`${auth.currentUser?.uid}`).set({
      userInfo: {
        firstName,
        secondName,
        birthday,
      },
    });
  };

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstNameValue = e.currentTarget.value;
    setUserInfo({ ...userInfo, firstName: firstNameValue });
  };

  const handleChangeSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const secondNameValue = e.currentTarget.value;
    setUserInfo({ ...userInfo, secondName: secondNameValue });
  };

  const handleChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthdayValue = e.currentTarget.value;
    setUserInfo({ ...userInfo, date: birthdayValue });
  };

  return (
    <>
      <UserNavbar></UserNavbar>
      <div className='container'>
        <div className='main'>
          <div className='content'>
            <div className='image'>
              <div className='img'></div>
              <ImageUploader
                withIcon={false}
                buttonText='Choose images'
                onChange={handleImg}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
              />
            </div>
            <div className='info'>
              <div className='names'>
                <TextField
                  inputRef={firstNameRef}
                  onChange={handleChangeFirstName}
                  type='text'
                  required
                  label='First name'
                  value={userInfo.firstName}
                />
                <TextField
                  inputRef={secondNameRef}
                  onChange={handleChangeSecondName}
                  type='text'
                  required
                  label='Second name'
                  value={userInfo.secondName}
                />
              </div>
              <div className='dls'>
                <TextField
                  inputRef={birthdayRef}
                  onChange={handleChangeBirthday}
                  type='date'
                  required
                  label='Birthday'
                  value={userInfo.date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleClick}
            className='right'
            variant='contained'
            color='secondary'
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
