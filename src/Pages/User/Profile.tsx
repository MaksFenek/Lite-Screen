// react
import React, { useState, useEffect } from 'react';

// Components

// Style and material ui
import '../../Styles/User/Profile.scss';
import TextField from '@material-ui/core/TextField';
import { Button, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

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
  AddUserStatus,
} from '../../Redux/Actions/mainActions';

// Firebase
import { db, auth, storageRef } from '../../Firebase';

export default function Profile() {
  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }
  interface userInfoInterface {
    firstName: string;
    secondName: string;
    birthday: string;
    status: string;
  }
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const useSelector: TypedUseSelectorHook<RootReducerInterface> = useReduxSelector;
  const state = useSelector((store) => store.auth);

  // Create dispatch
  const dispatch = useDispatch();

  // Create state for user info
  const [userInfo, setUserInfo] = useState<userInfoInterface>({
    firstName: '',
    secondName: '',
    birthday: '',
    status: '',
  });
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Set user information
    if (state.firstName !== '') {
      setUserInfo({
        firstName: state.firstName,
        secondName: state.secondName,
        birthday: state.date,
        status: state.status,
      });
    }

    // Create ref to user photo
    const userPhotoRef = storageRef
      .child(`${auth.currentUser?.uid}`)
      .child('photo');

    // Get user info and set it to state
    userPhotoRef.getDownloadURL().then((img) => {
      setPhoto(img);
    });
  }, [state]);
  // Handle actions
  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get image from input
    const img = e.currentTarget.files![0];

    // Create ref to user photo
    const userPhotoRef = storageRef
      .child(`${auth.currentUser?.uid}`)
      .child('photo');

    // Send user photo to firebase storage
    userPhotoRef.put(img).then(() => {
      // Set user photo to state
      userPhotoRef.getDownloadURL().then((img) => {
        setPhoto(img);
      });
    });
  };

  // Handle actions
  const handleClick = () => {
    // Get user info from inputs
    const status = userInfo.status;
    const firstName = userInfo.firstName;
    const secondName = userInfo.secondName;
    const birthday = userInfo.birthday;

    if (firstName !== '' && secondName !== '') {
      setOpen(true);
      // Set info in store
      dispatch(AddFirstAndSecondNamesAction({ firstName, secondName }));
      dispatch(AddUserDate(birthday));
      dispatch(AddUserStatus(status));

      if (auth.currentUser?.uid) {
        // Set info in firebase
        db.collection('users').doc(`${auth.currentUser?.uid}`).set({
          userInfo: {
            firstName,
            secondName,
            birthday,
            status,
          },
        });
      }
    }
  };

  // Handle actions
  const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const statusValue = e.currentTarget.value;
    setUserInfo({ ...userInfo, status: statusValue });
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
    setUserInfo({ ...userInfo, birthday: birthdayValue });
  };

  return (
    <>
      <div className='container'>
        <div className='main'>
          <div className='content'>
            <div className='image'>
              <div className='user-image'>
                <img src={photo} alt='' />
              </div>

              <input
                accept='image/*'
                className='img-input'
                id='contained-button-file'
                type='file'
                onChange={handleImg}
              />
              <label htmlFor='contained-button-file'>
                <Button variant='contained' color='primary' component='span'>
                  Upload
                </Button>
              </label>
            </div>
            <div className='info'>
              <div className='status'>
                <TextField
                  fullWidth
                  multiline
                  onChange={handleChangeStatus}
                  type='text'
                  label='Status'
                  rowsMax='2'
                  value={userInfo.status}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className='names'>
                <TextField
                  className='firstname'
                  onChange={handleChangeFirstName}
                  type='text'
                  required
                  label='First name'
                  value={userInfo.firstName}
                />
                <TextField
                  className='secondname'
                  onChange={handleChangeSecondName}
                  type='text'
                  required
                  label='Second name'
                  value={userInfo.secondName}
                />
              </div>

              <div className='dls'>
                <TextField
                  onChange={handleChangeBirthday}
                  type='date'
                  required
                  label='Birthday'
                  value={userInfo.birthday}
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
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              All saved
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
}
