// React
import React, { useEffect, useState } from 'react';

// Styles and material ui
import './UsersSearch.scss';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

// Components
import UserListItem from '../../../components/UserListItem/UserListItem';

// Redux
import { AddUserInSearchThunk } from '../../../Redux/Actions/searchActions';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerInterface } from '../../../Redux/Reducers/rootReducer';

// Types
import { IUserSearch } from '../../../_Types/appTypes';
import {
  getUsersInSearchSelector,
  getUsersLoadedSelector,
} from '../../../Redux/Selectors/searchSelector';

export default function UsersSearch() {
  const state = useSelector((store: RootReducerInterface) => store.search);

  const dispatch = useDispatch();
  // Create state for array of users
  const [users, setUsers] = useState<IUserSearch[] | undefined>(undefined);

  // Create state loaded for stop loading from database
  const [loaded] = useState<boolean>(getUsersLoadedSelector(state));

  useEffect(() => {
    if (!loaded) {
      dispatch(AddUserInSearchThunk());
    }
  }, [dispatch, loaded]);

  useEffect(() => {
    setUsers(getUsersInSearchSelector(state));
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
