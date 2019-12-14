import React from 'react';
import LandingPage from '../../Component/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../../Component/Onboarding/SignUp/SignUp';
import Login from '../../Component/Onboarding/Login/Login';
import CreateFlux from '../../Component/CreateFlux/CreateFlux';
import Modal from '../../MaterialUI/Component/Modal/Modal';
import Dashboard from '../../Component/Dashboard/Dashboard';

const App = () => {
  return (
    <div>
      <Switch>
        <Modal path='/modal' component={Modal} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/fluxing' component={CreateFlux} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </div>
  );
};

export default App;
