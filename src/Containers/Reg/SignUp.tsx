// React
import React, { useRef, useState } from 'react';

// Styles and material ui
import '../../Styles/Registration/SignUp.scss';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Firebase
import { auth, db } from '../../Firebase';

// ==== Main component ====
export default function SignUp() {
  // ==== TypeScript ====
  interface SignupInterface {
    email: string;
    password: string;
    firstName: string;
    secondName: string;
  }
  // Create state for error
  const [error, setError] = useState<null | string>(null);

  // ==== Refs ====
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const secondNameRef = useRef<HTMLInputElement>(null);

  // ==== Handle functions ====
  // Set email, password and others in state
  const handleClick = () => {
    const firstName = firstNameRef.current!.value;
    const secondName = secondNameRef.current!.value;

    // Create new user with email and password in firebase
    auth
      .createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )

      .then(() => {
        if (auth.currentUser?.uid) {
          // Get a user id
          const userId = auth.currentUser?.uid;
          // Create new document in users collection with name as user id
          db.collection('users').doc(userId).set({
            // Set user information in document
            userInfo: { firstName, secondName },
          });
        }
      })
      .catch((e) => {
        // Checking if there is an error and then set it in error state for render
        setError(e.message);
      });
  };

  return (
    <section className='signup'>
      <div className='container'>
        <div className='signup-body'>
          <div className='signup-image'></div>
          <div className='signup-forms'>
            <h3>Sign up</h3>
            <form className='signup-form' noValidate>
              <Input
                inputRef={emailRef}
                required
                className='signup-form-input'
                placeholder='E-mail'
              />
              <Input
                inputRef={passwordRef}
                type='password'
                required
                className='signup-form-input'
                placeholder='Password'
                inputProps={{ 'aria-label': 'Password' }}
              />
              <Input
                inputRef={firstNameRef}
                required
                className='signup-form-input'
                placeholder='First name'
                inputProps={{ 'aria-label': 'FirstName' }}
              />
              <Input
                inputRef={secondNameRef}
                required
                className='signup-form-input'
                placeholder='Second name'
                inputProps={{ 'aria-label': 'SecondName' }}
              />
              <Button color='primary' variant='contained' onClick={handleClick}>
                Send
              </Button>
              {error ? <p>{error}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
