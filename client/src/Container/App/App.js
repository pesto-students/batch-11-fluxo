import React from 'react';
import style from './App.module.scss';

import LandingPage from '../../Component/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../../Component/SignUp/SignUp';
import Login from '../../Component/Login/Login';
import MyFlux from '../../Component/MyFlux/MyFlux';


const App = () => {
  return (
    <div className={style.App}>
      <Switch>
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/' component={LandingPage} />
        <Route path='/myflux' component={MyFlux} />
      </Switch>
    </div>
  );
};

export default App;
