// React
import React from 'react';

// Components
import Navbar from '../../Components/Navbar';
import SignUp from '../../Containers/Reg/SignUp';

function Signup() {
  return (
    <>
      <Navbar title='Login' path='login' />
      <SignUp />
    </>
  );
}

export default Signup;
