// react
import React, { useState, useRef } from 'react';

// Components
import UserNavbar from '../../Containers/User/UserNavbar';
import ImageUploader from 'react-images-upload';

// Style and material ui
import '../../Styles/User/Profile.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ProfileIcon from '../../Icons/nophoto.png';

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
import { db, auth } from '../../Firebase';

export default function Profile() {
  interface userInfoInterface {
    firstName: string;
    secondName: string;
    birthday: string;
    status: string;
  }

  const useSelector: TypedUseSelectorHook<RootReducerInterface> = useReduxSelector;
  const state = useSelector((store) => store.auth);

  // Create dispatch
  const dispatch = useDispatch();

  // Refs
  const statusRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const secondNameRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);

  const user: userInfoInterface = JSON.parse(localStorage.getItem('user')!);
  // Create state for user info
  const [userInfo, setUserInfo] = useState<userInfoInterface>({
    firstName: state.firstName || user.firstName,
    secondName: state.secondName || user.secondName,
    birthday: state.date || user.birthday,
    status: state.status || user.status,
  });

  // Handle actions
  const handleImg = (picture: any) => {
    // Get file from input
  };

  // Handle actions
  const handleClick = () => {
    // Get user info from inputs
    const status = statusRef.current!.value;
    const firstName = firstNameRef.current!.value;
    const secondName = secondNameRef.current!.value;
    const birthday = birthdayRef.current!.value;

    if (firstName !== '' && secondName !== '') {
      // Set info in store
      dispatch(AddFirstAndSecondNamesAction({ firstName, secondName }));
      dispatch(AddUserDate(birthday));
      dispatch(AddUserStatus(status));

      // Set info in firebase
      db.collection('users').doc(`${auth.currentUser?.uid}`).set({
        userInfo: {
          firstName,
          secondName,
          birthday,
          status,
        },
      });

      // Set user information to local storage
      localStorage.setItem(
        'user',
        JSON.stringify({
          firstName,
          secondName,
          birthday,
          status,
        })
      );
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
      <UserNavbar></UserNavbar>
      <div className='container'>
        <div className='main'>
          <div className='content'>
            <div className='image'>
              <img src={ProfileIcon} alt='userPhoto' height='200' width='200' />
              <ImageUploader
                withIcon={false}
                buttonText='Choose images'
                onChange={handleImg}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
              />
            </div>
            <div className='info'>
              <div className='status'>
                <TextField
                  fullWidth
                  multiline
                  inputRef={statusRef}
                  onChange={handleChangeStatus}
                  type='text'
                  label='Status'
                  rows='2'
                  rowsMax='2'
                  value={userInfo.status}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
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
        </div>
      </div>
    </>
  );
}
