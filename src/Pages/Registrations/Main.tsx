import React from 'react';
import Navbar from '../../Components/Navbar';
import SignUp from '../../Components/SignUp';

function Main() {
  return (
    <>
      <Navbar title='Login' path='login' />
      <SignUp />
    </>
  );
}

export default Main;
