// React
import React, { useEffect, useState } from 'react';

// Styles and material ui
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

// Redux
import { AddUserInSearchThunk } from '../../Redux/Actions/searchActions';
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/rootReducer';

import { IUserSearch } from '../../_Types/appTypes';

import UserListItem from '../../Containers/User/UserListItem';

export default function UsersSearch() {
  const useSelector: TypedUseSelectorHook<RootReducerInterface> = useReduxSelector;
  const state = useSelector((store) => store.search);

  const dispatch = useDispatch();
  // Create state for array of users
  const [users, setUsers] = useState<IUserSearch[] | undefined>(undefined);

  // Create state loaded for stop loading from database
  const [loaded] = useState<boolean>(state.loaded);

  console.log(loaded);

  useEffect(() => {
    if (!loaded) {
      dispatch(AddUserInSearchThunk());
    }
  }, [dispatch, loaded]);

  useEffect(() => {
    console.log('user');

    setUsers(state.users);
  }, [state]);

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
                    key={index}
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
