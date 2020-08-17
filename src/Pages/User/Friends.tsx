// React
import React, { useEffect, useState } from 'react';

// Styles and material ui
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { IFriend } from '../../_Types/appTypes';

import UserListItem from '../../Containers/User/UserListItem';

export default function Friends() {
  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    // Get all friends from local storage
    setUsers(JSON.parse(localStorage.getItem('friends')!));
  }, []);
  return (
    <div className='container'>
      <section className='main-friends-content'>
        <div className='main-friends'>
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
          <div className='friends'>
            {users !== null
              ? users!.map((user: IFriend, index: number) => {
                  return (
                    <UserListItem
                      key={index}
                      name={user.name}
                      id={user.user}
                      photo={user.photo}
                      isFriend={true}
                    />
                  );
                })
              : ''}
          </div>
        </div>
        <div className='filters'></div>
      </section>
    </div>
  );
}
