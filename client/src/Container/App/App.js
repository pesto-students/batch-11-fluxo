import React from 'react';
import LandingPage from '../../Component/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../../Component/Onboarding/SignUp/SignUp';
import Login from '../../Component/Onboarding/Login/Login';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </div>
  );
};

export default App;
