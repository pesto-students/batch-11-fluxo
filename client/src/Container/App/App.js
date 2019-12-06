import React from 'react';
import style from './App.module.scss';
import LandingPage from '../../Component/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../../Component/SignUp/SignUp';
const App = () => {
  return (
    <div className={style.App}>
      <Switch>
        <Route path='/test' component={SignUp} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </div>
  );
};

export default App;
