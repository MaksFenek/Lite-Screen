// React
import React, { useRef, useState } from 'react';

// Styles and material ui
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import '../../Styles/Registration/Login.scss';

// Redux

// Firebase
import { auth } from '../../Firebase';

export default function LogIn() {
  // Create state for error
  const [error, setError] = useState<null | boolean>(null);
  // ==== Refs ====
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    // Get user email and password
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    // Sign in with email and password in firebase
    auth.signInWithEmailAndPassword(email, password).catch((e) => {
      // if there is an error set error state as true for render the error in form
      setError(e.message);
    });
  };

  return (
    <section className='login'>
      <div className='container'>
        <div className='login-body'>
          <div className='login-image'></div>
          <div className='login-forms'>
            <h3>Login</h3>
            <form className='login-form' noValidate>
              <Input
                inputRef={emailRef}
                required
                className='login-form-input'
                placeholder='E-mail'
                inputProps={{ 'aria-label': 'Email' }}
              />
              <Input
                inputRef={passwordRef}
                type='password'
                required
                className='login-form-input'
                placeholder='Password'
                inputProps={{ 'aria-label': 'Password' }}
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
