import React, { useEffect, useState } from 'react';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import '../../Styles/OtherUsers/Search.scss';

import ProfileIcon from '../../Icons/nophoto.png';
import AddIcon from '@material-ui/icons/Add';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { db } from '../../Firebase';
import { AddLoaded, AddUserInSearch } from '../../Redux/Actions/usersActions';

import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/rootReducer';

export default function UsersSearch() {
  const useSelector: TypedUseSelectorHook<RootReducerInterface> = useReduxSelector;
  const state = useSelector((store) => store.users);

  const dispatch = useDispatch();
  // Create state for array of users
  const [users, setUsers] = useState<Array<any> | undefined>(undefined);

  // Create state loaded for stop loading from database
  const [loaded, setLoaded] = useState<boolean>(state.loaded);

  useEffect(() => {
    setUsers(state.posts);

    if (!loaded) {
      setLoaded(true);
      dispatch(AddLoaded);
      db.collection('users')
        .get()
        .then((doc) => {
          doc.docs.forEach((doc) => {
            const name = `${doc.data().userInfo.firstName} ${
              doc.data().userInfo.secondName
            }`;
            const id = doc.id;

            dispatch(AddUserInSearch(name, id));
          });
        });
    }
  }, [state, dispatch, users, loaded]);

  return (
    <div className='container'>
      <div className='main-search'>
        <div className='search'>
          <InputBase
            className='search-input'
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
          />
          <div className='search-icon'>
            <SearchIcon />
          </div>
        </div>
        <div className='posts'>
          {users !== undefined
            ? users!.map((user, index) => (
                <div className='post' key={index}>
                  <Link to={`/users/${user.link}`}>
                    <img
                      className='post-img'
                      height='48'
                      width='48'
                      src={ProfileIcon}
                      alt='userPhoto'
                    />
                  </Link>
                  <div className='post-name'>
                    <h4>{user.name}</h4>
                  </div>

                  <div className='post-btn'>
                    <IconButton>
                      <MailOutlineIcon />
                    </IconButton>
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
}
