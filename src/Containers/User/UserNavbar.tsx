// React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//Components
import Navbar from '../../Containers/Navbar';
import Sidebar from '../../Containers/User/Sidebar';

// Style and material ui
import { Button, Avatar, Drawer } from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MenuIcon from '@material-ui/icons/Menu';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

//Redux
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/rootReducer';

// Firebase
import { auth } from '../../Firebase';

export default function UserNavbar({ setUser }: any) {
  const useSelector: TypedUseSelectorHook<RootReducerInterface> = useReduxSelector;
  const store = useSelector((store) => store.auth);

  // Create state for menu
  const [state, setState] = useState({
    right: false,
  });

  const [userId, setUserID] = useState<string | undefined>(store.userId);

  // Handle for sign out
  const handleSignOut = () => {
    auth.signOut();
  };

  // Toggle funtion for menu
  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Get window width
  const width = +window.innerWidth;

  return (
    <Navbar>
      <Link to='/'>
        <Button variant='contained' color='primary' onClick={handleSignOut}>
          <ExitToAppRoundedIcon />
        </Button>
      </Link>
      <Button variant='text' color='primary'>
        <Link to={`${userId}`}>
          <Avatar className='avatar'>
            <PersonRoundedIcon />
          </Avatar>
        </Link>
      </Button>

      {
        // If window width less than 1080px then we render menu button
        width <= 1080 ? (
          <>
            <Button
              onClick={toggleDrawer('right', true)}
              variant='contained'
              color='primary'
            >
              <MenuIcon />
            </Button>
            <Drawer
              anchor='right'
              open={state['right']}
              onClose={toggleDrawer('right', false)}
            >
              <Sidebar></Sidebar>
            </Drawer>
          </>
        ) : // Else nothing
        null
      }
    </Navbar>
  );
}
