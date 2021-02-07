// React
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  getUserFirstNameSelector,
  getUserSecondNameSelector,
  getUserDateSelector,
  getUserPhotoSelector,
  getUserStatusSelector,
} from '../../../Redux/Selectors/usersSelector';
// API
import { AddFriend } from '../../../api/friendsAPI';

// Types
import { createChat } from '../../../api/messagesAPI';
import PostList from '../../PostList/PostList';
import { IUsersInitialState } from '../../../Redux/Reducers/usersReducer';

const UsersProfile: React.FC = () => {
  const state = useSelector((store: RootReducerInterface) => store.users);

  const dispatch = useDispatch();
  // Create state for user ID
  const userId = useParams<{ id: string }>().id;

  // Create state for user info
  const [userInfo, setUserInfo] = useState<IUsersInitialState>({
    firstName: '',
    secondName: '',
    date: '',
    status: '',
    photo: '',
    isFriend: false,
    followersCount: 0,
    followingCount: 0,
  });

  useEffect(() => {
    dispatch(GetUsersThunk(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setUserInfo({
      firstName: getUserFirstNameSelector(state),
      secondName: getUserSecondNameSelector(state),
      date: getUserDateSelector(state),
      status: getUserStatusSelector(state),
      photo: getUserPhotoSelector(state),
      isFriend: state.isFriend,
      followersCount: state.followersCount,
      followingCount: state.followingCount,
    });
  }, [userId, state, dispatch]);

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
                    <p>{userInfo.followersCount} Following</p>
                  </Link>
                </div>

                <div className='subscribers'>
                  <Link to={`/followers/${userId}`}>
                    <p>{userInfo.followingCount} Followers</p>
                  </Link>
                </div>
                <div className='groups'>
                  <p>Groups</p>
                </div>
              </div>
            </div>
          </div>
          <div className='second-row'>
            {userInfo.isFriend ? (
              <Button
                className='subscribe'
                variant='contained'
                color='default'
                disabled>
                Friend
              </Button>
            ) : (
              <Button
                name={userId}
                onClick={AddFriend}
                className='subscribe'
                variant='contained'
                color='primary'>
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
                  onClick={createChat}>
                  Messages
                </Button>
              </Link>
              <div className='dls'>
                <div className='date'>Date: {userInfo.date}</div>
              </div>
            </div>

            <div className='posts'>
              {userId && <PostList author={userId} type='single' />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(UsersProfile);
