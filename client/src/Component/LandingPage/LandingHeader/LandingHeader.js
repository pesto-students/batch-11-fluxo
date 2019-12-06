import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  appHeader: {
    backgroundColor: '#5a3796',
  },
  title: {
    flexGrow: 1,
  },
}));

const LandingHeader = (props) => {
  const classes = useStyles();
  const loginButton = () => {
    props.history.push('/login');
  };
  const myfluxHandler = () => {
    props.history.push('/flux');
  };
  const button = props.isAuth ? myfluxHandler : loginButton;
  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appHeader}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Fluxo
          </Typography>
          <Button onClick={button} color='inherit'>
            {props.isAuth ? 'My Flux' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuthenticated,
  };
};
export default connect(mapStateToProps)(withRouter(LandingHeader));
