// React and react-router
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './Containers/Generic/Navbar/Navbar';

// Redux
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';
import { RootReducerInterface } from './Redux/Reducers/rootReducer';
import { GetUserThunk } from './Redux/Actions/mainActions';

// Firebase
import { auth } from './Firebase';
// Pages
const Auth = React.lazy(() => import('./Pages/Auth/Auth'));
const Main = React.lazy(() => import('./Pages/User/Main/Main'));
const Profile = React.lazy(() => import('./Pages/User/Profile/Profile'));
const UsersProfile = React.lazy(() =>
  import('./Pages/Users/UsersProfile/UsersProfile')
);
const Friends = React.lazy(() => import('./Pages/User/Friends/Friends'));
const UsersSearch = React.lazy(() =>
  import('./Pages/Users/UsersSearch/UsersSearch')
);

// ==== Main function ====
function App() {
  const useSelector: TypedUseSelectorHook<RootReducerInterface> = useReduxSelector;
  const state = useSelector((store) => store.auth);
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
                  <Route path='/messages'></Route>
                  <Route path='/friends'>
                    <Friends />
                  </Route>
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
