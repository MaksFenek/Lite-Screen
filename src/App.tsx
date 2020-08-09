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
import { Provider } from 'react-redux';
import rootReducer from './Redux/Reducers/rootReduser';
import { createStore } from 'redux';

// Firebase
import { auth } from './Firebase';

// Create the redux store with root reducer
const store = createStore(rootReducer);

// ==== Main function ====
function App() {
  // Create state for checking if user is loged in
  const [user, setUser] = useState<any>(undefined);

  const [userId, setUserID] = useState<string | undefined>(undefined);
  // Create dispatch

  // If there is a logged in user, set it in user state
  auth.onAuthStateChanged((person) => {
    setUser(person);
    setUserID(person?.uid);
  });

  return (
    <Provider store={store}>
      {user ? (
        <Router>
          <Switch>
            <Redirect exact from='/signup' to='/' />
            <Route exact path={`/${userId}`}>
              <Profile setUser={setUser} userId={userId} />
            </Route>
            <Route exact path='/'>
              <Main setUser={setUser} />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
          </Switch>
        </Router>
      )}
    </Provider>
  );
}

export default App;
