import React, { useEffect, useState } from 'react';
import LandingPage from '../../Component/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../../Component/Onboarding/SignUp/SignUp';
import Login from '../../Component/Onboarding/Login/Login';
import CreateFlux from '../../Component/CreateFlux/CreateFlux';
import Setting from '../../Component/Setting/Setting';
import { auth } from '../../apis/auth/auth';
import { connect } from 'react-redux';
import Spinner from '../../MaterialUI/Component/Spinner/Spinner';
import Dashboard from '../../Component/Dashboard/Dashboard';

const App = () => {
  const [authState, changeAuthState] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const authing = async () => {
      setLoading(true);
      const value = await auth();
      if (value) {
        setLoading(false);
      }
      changeAuthState(value.isAuthorized);
    };
    authing();
  }, []);

  let routes = (
    <Switch>
      <Route path='/setting' exact component={Setting} />
      <Route path='/dashboard' exact component={Dashboard} />
      <Route path='/fluxing' exact component={CreateFlux} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route
        path='/'
        exact
        render={() => <LandingPage isAuthorized={authState} />}
      />
    </Switch>
  );

  return <div>{loading ? <Spinner /> : routes}</div>;
};

const mapStateToProps = (state) => {
  return {
    isLoggedOut: state.logout,
  };
};

export default connect(mapStateToProps, null)(App);
