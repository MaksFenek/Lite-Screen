import React from 'react';

import Navbar from '../../Components/Navbar';

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { auth, db } from '../../Firebase';

// Redux
import { useDispatch } from 'react-redux';
import { AddFirstAndSecondNamesAction } from '../../Redux/Actions/mainActions';

export default function Main() {
  // Redux
  const dispatch = useDispatch();

  // Take a user object
  auth.onAuthStateChanged((user) => {
    // Find in users collection document with user id name

    if (user) {
      db.collection('users')
        .doc(user?.uid)
        // Get found document
        .get()
        .then((snapshot) => {
          // Get names from document fields
          const firstName = snapshot.get('firstName');
          const secondName = snapshot.get('secondName');
          // Create new action with first and second names
          const firstAndSecondNames = AddFirstAndSecondNamesAction({
            firstName,
            secondName,
          });
          // Dispatch action to reducer
          dispatch(firstAndSecondNames);
        });
    }
  });

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <>
      <Navbar>
        <Link to={`/`}>
          <Button variant='contained' color='primary' onClick={handleSignOut}>
            Sign out
          </Button>
        </Link>
      </Navbar>
    </>
  );
}
