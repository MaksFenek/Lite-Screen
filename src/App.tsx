import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Pages/Registrations/Main';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main}></Route>
      </Switch>
    </Router>
  );
}

export default App;
