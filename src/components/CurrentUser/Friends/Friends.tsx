// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Styles and Material ui
import './Friends.scss';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Types
import { IFriend } from '../../../_Types/appTypes';

// Components
import UserListItem from '../../UserListItem/UserListItem';

// API
import { getStorageItem } from '../../../api/localstorageAPI';
import { auth } from '../../../api/firebaseAPI';

interface IFriends {
  userName: string;
  people?: any;
  type?: 'followers' | 'following';
}

const Friends: React.FC<IFriends> = ({ userName, people, type }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [own, setOwn] = useState<boolean | undefined>(true);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Get user id from http path
    setUserId(
      document.location.pathname
        .split('')
        .filter((item: string, index: number) => index > 10 && item)
        .join('')
    );
  }, [userId]);

  useEffect(() => {
    if (type === 'followers') {
      if (people) {
        setUsers(people);
        setOwn(undefined);
      }
    } else if (type === 'following') {
      if (userId === auth.currentUser?.uid) {
        // Get all friends from local storage
        const friends = getStorageItem('friends');
        setUsers(friends);
        setOwn(true);
      } else if (people) {
        setUsers(people);
        setOwn(false);
      }
    }
  }, [people, userId, type]);

  return (
    <div className='container'>
      <section className='main-friends-content'>
        <div className='main-friends'>
          <div className='friend-header'>
            <Link to={`/users/${userId}`}>
              <ArrowBackIcon />
            </Link>
            <span>
              {userName}'s {type}
            </span>
          </div>
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
            {users !== null &&
              users!.map((user: IFriend, index: number) => {
                return (
                  <UserListItem
                    key={index}
                    name={user.name}
                    id={user.user}
                    isFriend={own}
                  />
                );
              })}
          </div>
        </div>
        <div className='filters'></div>
      </section>
    </div>
  );
};

export default React.memo(Friends);
