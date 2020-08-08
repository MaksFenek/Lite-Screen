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
  const [user, setUser] = useState<any>(null);

  // If there is a logged in user, set it in user state
  auth.onAuthStateChanged((person) => setUser(person));

  return (
    <Provider store={store}>
      {user ? (
        <Router>
          <Switch>
            <Redirect from='/login' to='/' />
            <Route exact path='/' component={Main} />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route exact path='/' component={Signup} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
      )}
    </Provider>
  );
}

export default App;
