import React from 'react';

import AuthForm from '../../Containers/Reg/AuthForm';

import Navbar from '../../Containers/Generic/Navbar';

import LoginImg from '../../Icons/undraw_authentication_fsn5.svg';
import SignupImg from '../../Icons/undraw_friendship_mni7.svg';

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IAuth {
  type: 'login' | 'signup';
}

const Auth: React.FC<IAuth> = (props) => {
  const type = props.type;

  const width: number = window.innerWidth;

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
            {width < 767 ? (
              ''
            ) : (
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

export default Auth;
