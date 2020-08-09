// React
import React from 'react';

//Components
import LogIn from '../../Containers/Reg/LogIn';
import Navbar from '../../Components/Navbar';

export default function Login() {
  return (
    <>
      <Navbar title='Sign up' path='' />
      <LogIn />
    </>
  );
}
