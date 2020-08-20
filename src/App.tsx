// React and react-router
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './containers/Generic/Navbar/Navbar';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerInterface } from './Redux/Reducers/rootReducer';
import { GetUserThunk } from './Redux/Actions/currentUserActions';

// Firebase
import { auth } from './api/firebaseAPI';
import Messages from './containers/MessagesList/MessagesList';
import Chat from './components/UserChatItem/Chat/Chat';
// Pages
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Main = React.lazy(() => import('./containers/News/News'));
const Profile = React.lazy(() => import('./containers/Profile/Profile'));
const UsersProfile = React.lazy(() =>
  import('./containers/Users/UsersProfile/UsersProfile')
);
const Friends = React.lazy(() =>
  import('./components/CurrentUser/Friends/Friends')
);
const UsersSearch = React.lazy(() =>
  import('./containers/Users/UsersSearch/UsersSearch')
);

// ==== Main function ====
function App() {
  console.log('hi');

  const state = useSelector((store: RootReducerInterface) => store.auth);
  // Create dispatch
  const dispatch = useDispatch();

  const [userId, setUserID] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setUserID(auth.currentUser?.uid);
    // If there is a logged in user, set it in user state
    auth.onAuthStateChanged((person) => {
      setUserID(person?.uid);
    });
    dispatch(GetUserThunk(userId));

    setLoaded(state.loaded);
  }, [userId, state.loaded, dispatch]);
  return (
    <React.Suspense fallback={<></>}>
      <Router>
        <Switch>
          {loaded ? (
            <>
              {auth.currentUser ? (
                <>
                  <Navbar user={userId} />
                  <Route path='/signup'>
                    <Redirect exact from='/signup' to='/' />
                  </Route>
                  <Route exact path='/'>
                    <Main />
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
                  <Route path='/friends'>
                    <Friends />
                  </Route>
                  <Route path='/messages/*' component={Chat} />
                  <Route path='/users/*' component={UsersProfile} />
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
          ) : (
            <></>
          )}
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;
