// React and react-router
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
import Signup from './Pages/Registrations/SignupPage';
import Login from './Pages/Registrations/LoginPage';

// Redux
import { Provider } from 'react-redux';
import rootReducer from './Redux/Reducers/rootReduser';
import { createStore } from 'redux';

// Create the redux store with root reducer
const store = createStore(rootReducer);

// ==== Main function ====
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Signup}></Route>
          <Route exact path='/login' component={Login}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
