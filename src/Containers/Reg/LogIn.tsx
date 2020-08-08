// React
import React from 'react';

// Styles and material ui
import { Input } from '@material-ui/core';
import '../../Styles/Registration/Login.scss';

export default function LogIn() {
  return (
    <section className='login'>
      <div className='container'>
        <div className='login-body'>
          <div className='login-image'></div>
          <div className='login-forms'>
            <h3>Login</h3>
            <form className='login-form' noValidate>
              <Input
                required
                className='login-form-input'
                placeholder='E-mail'
                inputProps={{ 'aria-label': 'Email' }}
              />
              <Input
                type='password'
                required
                className='login-form-input'
                placeholder='Password'
                inputProps={{ 'aria-label': 'Password' }}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
