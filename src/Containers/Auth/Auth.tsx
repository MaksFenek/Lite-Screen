// React
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import AuthForm from './AuthForm/AuthForm';
import Navbar from '../Generic/Navbar/Navbar';

// Images
import LoginImg from '../../Icons/undraw_authentication_fsn5.svg';
import SignupImg from '../../Icons/undraw_friendship_mni7.svg';

// Styles and Material ui
import './Auth.scss';
import { Button } from '@material-ui/core';

// ==== TypeScript ====
interface IAuth {
  type: 'login' | 'signup';
}

const Auth: React.FC<IAuth> = ({ type }) => {
  return (
    <>
      <Navbar>
        <Link to={type === 'login' ? `/signup` : `/`}>
          <Button variant='contained' color='primary'>
            {type === 'login' ? `Sign Up` : `Login`}
          </Button>
        </Link>
      </Navbar>
      <section className='auth'>
        <div className='container'>
          <div className='auth-body'>
            {window.innerWidth > 768 && (
              <img
                src={type === 'login' ? LoginImg : SignupImg}
                className={type === 'login' ? 'login-image' : 'signup-image'}
                alt=''
              />
            )}

            <AuthForm type={type === 'login' ? 'login' : 'signup'} />
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(Auth);
