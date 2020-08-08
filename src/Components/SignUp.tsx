import React from 'react';
import '../Styles/Registration/SignUp.scss';
import { Input } from '@material-ui/core';

export default function SignUp() {
  return (
    <section className='signup'>
      <div className='container'>
        <div className='signup-body'>
          <div className='signup-image'></div>
          <div className='signup-forms'>
            <h3>Sign up</h3>
            <form className='signup-form' noValidate>
              <Input
                required
                className='signup-form-input'
                placeholder='E-mail'
                inputProps={{ 'aria-label': 'Email' }}
              />
              <Input
                type='password'
                required
                className='signup-form-input'
                placeholder='Password'
                inputProps={{ 'aria-label': 'Password' }}
              />
              <Input
                required
                className='signup-form-input'
                placeholder='First name'
                inputProps={{ 'aria-label': 'FirstName' }}
              />
              <Input
                required
                className='signup-form-input'
                placeholder='Second name'
                inputProps={{ 'aria-label': 'SecondName' }}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
