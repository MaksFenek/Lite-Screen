// React
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Style and material ui
import './UsersProfile.scss';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerInterface } from '../../../Redux/Reducers/rootReducer';
import { GetUsersThunk } from '../../../Redux/Actions/usersActions';
import {
  getCurrentUserDateSelector,
  getCurrentUserFirstNameSelector,
  getCurrentUserPhotoSelector,
  getCurrentUserIdSelector,
  getCurrentUserSecondNameSelector,
  getCurrentUserStatusSelector,
} from '../../../Redux/Selectors/currentUserSelector';
import {
  getUserFirstNameSelector,
  getUserSecondNameSelector,
  getUserDateSelector,
  getUserPhotoSelector,
  getUserStatusSelector,
} from '../../../Redux/Selectors/usersSelector';
// API
import {
  AddFriend,
  getFollowingCount,
  getFriendsCount,
} from '../../../api/friendsAPI';
import { getStorageItem } from '../../../api/localstorageAPI';

// Types
import { IUserInfo } from '../../../_Types/appTypes';
import { createChat } from '../../../api/messagesAPI';

const UsersProfile = () => {
  const state = useSelector((store: RootReducerInterface) => store);
  const userState = state.auth;
  const otherUsersState = state.users;

  const dispatch = useDispatch();
  // Create state for user ID
  const [userId, setUserId] = useState<undefined | string>(undefined);

  // Create state for user info
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    firstName: '',
    secondName: '',
    birthday: '',
    status: '',
    photo: '',
  });

  // Create state for initialize a friend
  const [isFriend, setIsFriend] = useState<boolean>(false);

  const [friendsCount, setFriendsCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  let location = useLocation();

  useEffect(() => {
    getFriendsCount(userId!).then((count) => setFriendsCount(count!));
    getFollowingCount(
      userId!,
      userInfo.firstName + ' ' + userInfo.secondName
    ).then((count) => setFollowingCount(count!));
  }, [userId, userInfo.firstName, userInfo.secondName]);

  useEffect(() => {
    setUserId(
      // Get pathname of the page and delele '/users/'
      document.location.pathname
        .split('')
        .filter((item: string, index: number) => index > 6 && item)
        .join('')
    );
    const friends = getStorageItem('friends');

    // Check if there is array of friends in local storage
    if (friends) {
      // Get all friends
      if (friends.find((friend: any) => friend.user === userId)) {
        setIsFriend(true);
      }
    }
    if (userId === getCurrentUserIdSelector(userState)) {
      setIsFriend(true);
    }
  }, [location, userInfo, userId, userState]);

  useEffect(() => {
    dispatch(GetUsersThunk(userId));
  }, [location, dispatch, userId]);

  useEffect(() => {
    if (userInfo.firstName === '' || userInfo.photo === '') {
      if (userId !== getCurrentUserIdSelector(userState)) {
        setUserInfo({
          firstName: getUserFirstNameSelector(otherUsersState),
          secondName: getUserSecondNameSelector(otherUsersState),
          birthday: getUserDateSelector(otherUsersState),
          status: getUserStatusSelector(otherUsersState),
          photo: getUserPhotoSelector(otherUsersState),
        });
      } else {
        setUserInfo({
          firstName: getCurrentUserFirstNameSelector(userState),
          secondName: getCurrentUserSecondNameSelector(userState),
          birthday: getCurrentUserDateSelector(userState),
          status: getCurrentUserStatusSelector(userState),
          photo: getCurrentUserPhotoSelector(userState),
        });
      }
    }
  }, [
    userId,
    userInfo,
    otherUsersState,
    userState,
    dispatch,
    location.pathname,
  ]);

  useEffect(() => {
    setUserInfo({
      firstName: '',
      secondName: '',
      birthday: '',
      status: '',
      photo: '',
    });
  }, []);

  return (
    <>
      <div className='container'>
        <div className='main-users'>
          <div className='content bg'>
            <div className='image'>
              <div className='user-image'>
                <img src={userInfo.photo} alt='' />
              </div>
            </div>
            <div className='info'>
              <div className='names'>
                <h3>
                  {userInfo.firstName} {userInfo.secondName}
                </h3>
                <span>Offline</span>
              </div>
              {userInfo.status && (
                <div className='status'>
                  <p>{userInfo.status}</p>
                </div>
              )}

              <div className='people'>
                <div className='friends'>
                  <Link to={`/following/${userId}`}>
                    <p>{friendsCount} Following</p>
                  </Link>
                </div>

                <div className='subscribers'>
                  <Link to={`/followers/${userId}`}>
                    <p>{followingCount} Followers</p>
                  </Link>
                </div>
                <div className='groups'>
                  <p>Groups</p>
                </div>
              </div>
            </div>
          </div>
          <div className='second-row'>
            {isFriend ? (
              <Button
                className='subscribe'
                variant='contained'
                color='default'
                disabled
              >
                Friend
              </Button>
            ) : (
              <Button
                name={userId}
                value={otherUsersState.photo}
                onClick={AddFriend}
                className='subscribe'
                variant='contained'
                color='primary'
              >
                Subscribe
              </Button>
            )}

            <div className='search'>
              <div className='search-icon'>
                <SearchIcon />
              </div>
              <InputBase
                className='search-input'
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className='column'>
              <Link to={`/messages/${userId}`}>
                <Button
                  name={userId}
                  className='messages'
                  variant='contained'
                  color='primary'
                  onClick={createChat}
                >
                  Messages
                </Button>
              </Link>
              <div className='dls'>
                <div className='date'>Date: {userInfo.birthday}</div>
              </div>
            </div>

            <div className='posts'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(UsersProfile);
