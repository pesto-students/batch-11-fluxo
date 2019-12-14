import React, { useEffect, useState } from 'react';
import LandingPage from '../../Component/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../../Component/Onboarding/SignUp/SignUp';
import Login from '../../Component/Onboarding/Login/Login';
import CreateFlux from '../../Component/CreateFlux/CreateFlux';
import Setting from '../../Component/Setting/Setting';
import { auth } from '../../apis/auth/auth';
import { connect } from 'react-redux';
import Dashboard from '../../Component/Dashboard/Dashboard';

const App = ({ isLoggedOut }) => {
  const [authState, changeAuthState] = useState(false);
  useEffect(() => {
    const authing = async () => {
      const value = await auth();
      changeAuthState(!isLoggedOut);
    };
    authing();
  }, [isLoggedOut]);
  return (
    <div>
      <Switch>
        <Route exact path='/setting' component={Setting} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/fluxing' component={CreateFlux} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route
          exact
          path='/'
          render={() => <LandingPage isAuthorized={authState} />}
        />
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedOut: state.logout,
  };
};
export default connect(mapStateToProps, null)(App);
