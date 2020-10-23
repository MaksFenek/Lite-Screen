// React and react-router
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './containers/Generic/Navbar/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import {  useDispatch } from 'react-redux';
import { GetUserThunk } from './Redux/Actions/currentUserActions';

// Firebase
import { auth } from './api/firebaseAPI';
import Messages from './containers/MessagesList/MessagesList';
import Chat from './containers/MessagesList/Chat/Chat';
import Followers from './containers/Users/Followers/Followers';
import Following from './containers/Users/Followers/Following';
import { setAllChats } from './api/messagesAPI';
// Pages
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Main = React.lazy(() => import('./containers/News/News'));
const Profile = React.lazy(() => import('./containers/Profile/Profile'));
const UsersProfile = React.lazy(
  () => import('./containers/Users/UsersProfile/UsersProfile')
);
const UsersSearch = React.lazy(
  () => import('./containers/Users/UsersSearch/UsersSearch')
);

// ==== Main function ====
function App() {
  // Create dispatch
  const dispatch = useDispatch();

  const [userId, setUserID] = useState<string | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((person) => {
      setUserID(person?.uid);
    });
    setUserID(auth.currentUser?.uid);
    // If there is a logged in user, set it in user state
    dispatch(GetUserThunk(userId));

    setAllChats(userId!);
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
              {auth.currentUser ? (
                <>
                  <Navbar user={userId} />
                  <Route path='/signup'>
                    <Redirect exact from='/signup' to='/' />
                  </Route>
                  <Route exact path='/'>
                    <Main id={userId} />
                  </Route>
                  <Route path={`/${auth.currentUser?.uid}`}>
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
                  <Route path='/messages/:id' component={Chat} />
                  <Route path='/users/:id' component={UsersProfile} />
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
