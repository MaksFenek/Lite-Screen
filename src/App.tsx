// React and react-router
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import UserNavbar from './Containers/User/UserNavbar';

// Redux
import { useDispatch } from 'react-redux';
import {
  AddFirstAndSecondNamesAction,
  AddUserDate,
  AddUserStatus,
} from './Redux/Actions/mainActions';

// Firebase
import { auth, db } from './Firebase';

// Pages
const Signup = React.lazy(() => import('./Pages/Registrations/SignupPage'));
const Login = React.lazy(() => import('./Pages/Registrations/LoginPage'));
const Main = React.lazy(() => import('./Pages/User/Main'));
const Profile = React.lazy(() => import('./Pages/User/Profile'));
const UsersProfile = React.lazy(() =>
  import('./Pages/OtherUsers/UsersProfile')
);
const Friends = React.lazy(() => import('./Pages/User/Friends'));
const UsersSearch = React.lazy(() => import('./Pages/OtherUsers/UsersSearch'));

// ==== Main function ====
function App() {
  // Create dispatch
  const dispatch = useDispatch();

  const [userId, setUserID] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setUserID(auth.currentUser?.uid);

    // If there is a logged in user, set it in user state
    auth.onAuthStateChanged((person) => {
      setUserID(person?.uid);
      setLoaded(true);
    });
    if (userId) {
      db.collection('users')
        .doc(userId)
        // Get found document
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            // Get names from document fields
            const firstName = snapshot.data()?.userInfo.firstName;
            const secondName = snapshot.data()?.userInfo.secondName;
            const birthday = snapshot.data()?.userInfo.birthday;
            const status = snapshot.data()?.userInfo.status;

            // Create new action with user info
            // Dispatch action to reducer
            dispatch(
              AddFirstAndSecondNamesAction({
                firstName,
                secondName,
              })
            );
            dispatch(AddUserDate(birthday));
            dispatch(AddUserStatus(status));
          }
        });

      // Get the current user document from firebase
      db.collection('users')
        .doc(userId)
        .get()
        .then((user) => {
          if (user.exists) {
            if (
              // Check if  friends in user document in firebase is not equel to friends array in local storage
              // to not load again the friends array from firebase
              user.data()?.friends !==
                JSON.parse(localStorage.getItem('friends')!) &&
              // And that there is friends array is exist
              JSON.parse(localStorage.getItem('friends')!) !== undefined &&
              user.data()?.friends !== undefined
            )
              // Set friends in local storage
              localStorage.setItem(
                'friends',
                JSON.stringify(user.data()?.friends)
              );
          }
        });
    }
  }, [userId, dispatch]);
  return (
    <React.Suspense fallback={<></>}>
      <Router>
        <Switch>
          {loaded ? (
            <>
              {auth.currentUser && loaded ? (
                <>
                  <UserNavbar />
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
                    <Login />
                  </Route>
                  <Route path='/signup'>
                    <Signup />
                  </Route>
                </>
              )}
            </>
          ) : (
            ''
          )}
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;
