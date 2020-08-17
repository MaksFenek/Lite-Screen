// React
import React, { useEffect, useState } from 'react';

// Styles and material ui
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

// Redux
import { AddLoaded, AddUserInSearch } from '../../Redux/Actions/usersActions';
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/rootReducer';

// Firebase
import { db, storageRef } from '../../Firebase';

import { IUserSearch } from '../../_Types/appTypes';

import UserListItem from '../../Containers/User/UserListItem';

export default function UsersSearch() {
  const useSelector: TypedUseSelectorHook<RootReducerInterface> = useReduxSelector;
  const state = useSelector((store) => store.users);

  const dispatch = useDispatch();
  // Create state for array of users
  const [users, setUsers] = useState<IUserSearch[] | undefined>(undefined);

  // Create state loaded for stop loading from database
  const [loaded, setLoaded] = useState<boolean>(state.loaded);

  useEffect(() => {
    setUsers(state.users);

    if (!loaded) {
      setLoaded(true);
      dispatch(AddLoaded);
      // Get the users collection from firebase
      db.collection('users')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            // Get name from user info
            const name: string = `${doc.data().userInfo.firstName} ${
              doc.data().userInfo.secondName
            }`;
            //Get user id
            const id: string = doc.id;

            // Get user photo
            storageRef
              .child(`${id}/`)
              .child('photo')
              .getDownloadURL()
              .then((url) => {
                // Create new user in search page
                dispatch(AddUserInSearch(name, id, url));
              });
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
            ? users!.map((user, index) => {
                return (
                  <UserListItem
                    name={user.name}
                    id={user.id}
                    photo={user.photo}
                    isFriend={false}
                  />
                );
              })
            : ''}
        </div>
      </div>
    </div>
  );
}
