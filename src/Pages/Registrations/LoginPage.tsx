// React
import React from 'react';

//Components
import LogIn from '../../Containers/Reg/LogIn';
import Navbar from '../../Components/Navbar';

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <Navbar>
        <Link to={`/signup`}>
          <Button variant='contained' color='primary'>
            Sign up
          </Button>
        </Link>
      </Navbar>
      <LogIn />
    </>
  );
}
