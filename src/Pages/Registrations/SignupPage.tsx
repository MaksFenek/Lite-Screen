// React
import React from 'react';

// Components
import Navbar from '../../Containers/Navbar';
import SignUp from '../../Containers/Reg/SignUp';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <>
      <Navbar>
        <Link to={`/`}>
          <Button variant='contained' color='primary'>
            Login
          </Button>
        </Link>
      </Navbar>
      <SignUp />
    </>
  );
}

export default Signup;
