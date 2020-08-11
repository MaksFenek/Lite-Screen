// React and react-router
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Pages
import Signup from './Pages/Registrations/SignupPage';
import Login from './Pages/Registrations/LoginPage';
import Main from './Pages/User/Main';
import Profile from './Pages/User/Profile';

// Redux
import { useDispatch } from 'react-redux';
import {
  AddFirstAndSecondNamesAction,
  AddUserDate,
} from './Redux/Actions/mainActions';

// Firebase
import { auth, db } from './Firebase';

// ==== Main function ====
function App() {
  // Create dispatch
  const dispatch = useDispatch();

  const [userId, setUserID] = useState<string | undefined>(undefined);

  // If there is a logged in user, set it in user state
  auth.onAuthStateChanged((person) => {
    setUserID(person?.uid);
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

          // Create new action with first and second names
          // Dispatch action to reducer
          dispatch(
            AddFirstAndSecondNamesAction({
              firstName,
              secondName,
            })
          );

          dispatch(AddUserDate(birthday));
        }
      });
  }

  return (
    <Router>
      <Switch>
        {userId ? (
          <>
            <Redirect exact from='/signup' to='/' />

            <Route exact path='/'>
              <Main />
            </Route>
            <Route exact path={`/${userId}`}>
              <Profile />
            </Route>
          </>
        ) : (
          <>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
