// React and react-router
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Components
import Navbar from './containers/Generic/Navbar/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import {  useDispatch } from 'react-redux';
import { GetUserThunk } from './Redux/Actions/currentUserActions';

// API
import { auth } from './api/firebaseAPI';
import { setAllChats } from './api/messagesAPI';

// Pages
import Auth from './containers/Auth/Auth'
import Main from './containers/News/News'
import Profile from './containers/Profile/Profile'
import UsersProfile from './containers/Users/UsersProfile/UsersProfile'
import UsersSearch from './containers/Users/UsersSearch/UsersSearch'
import Messages from './containers/MessagesList/MessagesList';
import Chat from './containers/MessagesList/Chat/Chat';
import Followers from './containers/Users/Followers/Followers';
import Following from './containers/Users/Followers/Following';

// ==== Main function ====
 const App:React.FC = () => {
  // Create dispatch
  const dispatch = useDispatch();

  const [userId, setUserID] = useState<string | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((person) => {
      setUserID(person?.uid);
    });

    if(userId) {
    setUserID(auth.currentUser?.uid);
    // If there is a logged in user, set it in user state
    dispatch(GetUserThunk(userId));

    setAllChats(userId!);
    }
    
  }, [userId, dispatch]);

  return (
    <React.Suspense
      fallback={
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color='primary' />
        </div>
      }
    >
      <Router>
        <Switch>
            <>
              {userId ? (
                <>
                  <Navbar user={userId} />
                  <Route path='/signup'>
                    <Redirect exact from='/signup' to='/' />
                  </Route>
                  <Route exact path='/'>
                    <Main id={userId} />
                  </Route>
                  <Route path={`/${userId}`}>
                    <Profile />
                  </Route>
                  <Route path='/search'>
                    <UsersSearch />
                  </Route>
                  <Route exact path='/messages'>
                    <Messages />
                  </Route>
                  <Route path='/followers/:id'>
                    <Followers />
                  </Route>
                  <Route path='/following/:id'>
                    <Following />
                  </Route>
                  <Route path='/messages/:id'>
                    <Chat/>
                  </Route>
                  <Route path='/users/:id'>
                    <UsersProfile/>
                  </Route>
                </>
              ) : (
                <>
                  <Route exact path='/'>
                    <Auth type='login' />
                  </Route>
                  <Route path='/signup'>
                    <Auth type='signup' />
                  </Route>
                </>
              )}
            </>
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;
