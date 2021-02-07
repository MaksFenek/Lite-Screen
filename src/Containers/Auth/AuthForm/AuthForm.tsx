// React
import React, { useCallback } from 'react';

// Styles and Material ui
import './AuthForm.scss';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Firebase
import {
  signinInAccount,
  createAccount,
  getUserDoc,
  putUserPhoto,
  getPostsCollection,
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

  const handleClickLogin = useCallback((): void => {
    // Get user email and password
    const email: string = emailRef.current!.value;
    const password: string = passwordRef.current!.value;

    // Sign in with email and password in firebase
    signinInAccount(email, password).catch((e: FirebaseError) => {
      // if there is an error set error state as true for render the error in form
      setError(e.message);
    });
  }, []);

  const handleClickSignup = useCallback((): void => {
    const email: string = emailRef.current!.value;
    const password: string = passwordRef.current!.value;
    const firstName: string = firstNameRef.current!.value;
    const secondName: string = secondNameRef.current!.value;

    // Create new user with email and password in firebase
    createAccount(email, password)
      .then((user) => {
        if (user.user?.uid) {
          // Get a user id
          const userId: string = user.user?.uid;
          // Create new document in users collection with name as user id
          getUserDoc(userId).set({
            // Set user information in document
            userInfo: { firstName, secondName },
          });
          getPostsCollection.doc(userId).set({ posts: [] });
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
  }, []);

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
              placeholder='Last name'
              inputProps={{ 'aria-label': 'SecondName' }}
            />
          </>
        ) : (
          ''
        )}
        <Button
          color='primary'
          variant='contained'
          onClick={type === 'login' ? handleClickLogin : handleClickSignup}>
          Send
        </Button>
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
};

export default React.memo(AuthForm);
