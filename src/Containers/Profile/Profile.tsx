// react
import React, { useState, useEffect, useCallback } from 'react';

// Style and material ui
import './Profile.scss';
import TextField from '@material-ui/core/TextField';
import { Button, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/rootReducer';
import { SetUserInfoThunk } from '../../Redux/Actions/currentUserActions';

// API
import { getUserPhoto, putUserPhoto } from '../../api/firebaseAPI';

// Types
import { IUserInfo } from '../../_Types/appTypes';
import {
  getCurrentUserDateSelector,
  getCurrentUserFirstNameSelector,
  getCurrentUserIdSelector,
  getCurrentUserPhotoSelector,
  getCurrentUserSecondNameSelector,
  getCurrentUserStatusSelector,
} from '../../Redux/Selectors/currentUserSelector';
import PostCreator from './PostCreator/PostCreator';
import PostList from '../PostList/PostList';

const Profile: React.FC = () => {
  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  const [open, setOpen] = useState(false);

  const handleClose = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    },
    []
  );

  const state = useSelector((store: RootReducerInterface) => store.auth);

  // Create dispatch
  const dispatch = useDispatch();

  // Create state for user info
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    firstName: '',
    secondName: '',
    birthday: '',
    status: '',
    photo: '',
  });

  const userId = getCurrentUserIdSelector(state);

  useEffect(() => {
    // Set user information
    setUserInfo({
      firstName: getCurrentUserFirstNameSelector(state),
      secondName: getCurrentUserSecondNameSelector(state),
      birthday: getCurrentUserDateSelector(state),
      status: getCurrentUserStatusSelector(state),
      photo: getCurrentUserPhotoSelector(state),
    });
  }, [state]);
  // Handle actions
  const handleImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      // Get image from input
      const img = e.currentTarget.files![0];

      putUserPhoto(userId, img).then(() => {
        getUserPhoto(userId).then((photo) => {
          setUserInfo({ ...userInfo, photo });
        });
      });
    },
    [userId, userInfo]
  );

  // Handle actions
  const handleClick = useCallback((): void => {
    // Get user info from inputs
    const status: string = userInfo.status;
    const firstName: string = userInfo.firstName;
    const secondName: string = userInfo.secondName;
    const birthday: string = userInfo.birthday;

    if (firstName && secondName) {
      setOpen(true);

      dispatch(SetUserInfoThunk(firstName, secondName, birthday, status));
    }
  }, [setOpen, dispatch, userInfo]);

  // Handle actions
  const handleChangeStatus = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const statusValue: string = e.currentTarget.value;
      setUserInfo({ ...userInfo, status: statusValue });
    },
    [setUserInfo, userInfo]
  );

  const handleChangeFirstName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const firstNameValue: string = e.currentTarget.value;
      setUserInfo({ ...userInfo, firstName: firstNameValue });
    },
    [userInfo]
  );

  const handleChangeSecondName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const secondNameValue: string = e.currentTarget.value;
      setUserInfo({ ...userInfo, secondName: secondNameValue });
    },
    [userInfo]
  );

  const handleChangeBirthday = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const birthdayValue: string = e.currentTarget.value;
      setUserInfo({ ...userInfo, birthday: birthdayValue });
    },
    [userInfo]
  );

  return (
    <>
      <div className='container'>
        <div className='main'>
          <div className='content'>
            <div className='image'>
              <div className='user-image'>
                <img src={userInfo.photo} alt='' />
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
                  label='Last name'
                  value={userInfo.secondName}
                />
              </div>

              <div className='dls'>
                <TextField
                  onChange={handleChangeBirthday}
                  type='date'
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
            color='secondary'>
            Save
          </Button>
          <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              All saved
            </Alert>
          </Snackbar>
          <PostCreator
            author={userInfo.firstName + ' ' + userInfo.secondName}
            id={userId}
          />
          <div className='posts'>
            <PostList author={userId} type='single' />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Profile);
