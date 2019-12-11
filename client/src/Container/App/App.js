import React from 'react';
import LandingPage from '../../Component/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../../Component/SignUp/SignUp';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path='/signup' component={SignUp} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </div>
  );
};

export default App;
