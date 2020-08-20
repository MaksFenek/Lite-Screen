// React
import React from 'react';

// Styles and Material ui
import './AuthForm.scss';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Firebase
import {
  auth,
  signinInAccount,
  createAccount,
  getUserDoc,
  putUserPhoto,
} from '../../../api/firebaseAPI';
import { FirebaseError } from 'firebase';

// ==== TypeScript ====
interface IAuthForm {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<IAuthForm> = ({ type }) => {
  // Create state for error
  const [error, setError] = React.useState<null | string>(null);

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const secondNameRef = React.useRef<HTMLInputElement>(null);

  const handleClickLogin = (): void => {
    // Get user email and password
    const email: string = emailRef.current!.value;
    const password: string = passwordRef.current!.value;

    // Sign in with email and password in firebase
    signinInAccount(email, password).catch((e: FirebaseError) => {
      // if there is an error set error state as true for render the error in form
      setError(e.message);
    });
  };

  const handleClickSignup = (): void => {
    const email: string = emailRef.current!.value;
    const password: string = passwordRef.current!.value;
    const firstName: string = firstNameRef.current!.value;
    const secondName: string = secondNameRef.current!.value;

    // Create new user with email and password in firebase
    createAccount(email, password)
      .then(() => {
        if (auth.currentUser?.uid) {
          // Get a user id
          const userId: string = auth.currentUser?.uid;
          // Create new document in users collection with name as user id
          getUserDoc(userId).set({
            // Set user information in document
            userInfo: { firstName, secondName },
          });
          fetch('https://semantic-ui.com/images/wireframe/white-image.png')
            .then(function (response) {
              return response.blob();
            })
            .then(function (blob) {
              putUserPhoto(userId, blob);
            });
        }
      })
      .catch((e: FirebaseError) => {
        // Checking if there is an error and then set it in error state for render
        setError(e.message);
      });
  };

  return (
    <div className='auth-forms'>
      <h3>{type === 'login' ? 'Login' : 'Sign Up'}</h3>
      <form className='auth-form' noValidate>
        <Input
          inputRef={emailRef}
          required
          className='auth-form-input'
          placeholder='E-mail'
          inputProps={{ 'aria-label': 'Email' }}
        />
        <Input
          inputRef={passwordRef}
          type='password'
          required
          className='auth-form-input'
          placeholder='Password'
          inputProps={{ 'aria-label': 'Password' }}
        />
        {type === 'signup' ? (
          <>
            <Input
              inputRef={firstNameRef}
              required
              className='auth-form-input'
              placeholder='First name'
              inputProps={{ 'aria-label': 'FirstName' }}
            />
            <Input
              inputRef={secondNameRef}
              required
              className='auth-form-input'
              placeholder='Second name'
              inputProps={{ 'aria-label': 'SecondName' }}
            />
          </>
        ) : (
          ''
        )}
        <Button
          color='primary'
          variant='contained'
          onClick={type === 'login' ? handleClickLogin : handleClickSignup}
        >
          Send
        </Button>
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
};

export default AuthForm;
