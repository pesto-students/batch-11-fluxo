import React, { Component } from 'react';
import style from './App.module.scss';
import LandingPage from '../../Component/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../../Component/SignUp/SignUp';
import Login from '../../Component/Login/Login';
import DashBoard from '../../Component/DashBoard/DashBoard';
import { connect } from 'react-redux';
class App extends Component {
  componentDidMount() {
    const token = document.cookie;
    this.props.cookieChecker(token);
  }
  render() {
    let routes = null;
    if (this.props.isAuthenticated) {
      routes = <Route path='/dashboard' component={DashBoard} />;
    }
    return (
      <div className={style.App}>
        <Switch>
          {routes}
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/' exact component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cookieChecker: (token) => {
      dispatch({ type: 'CHECK_COOKIE', token: token });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
