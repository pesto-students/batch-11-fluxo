import React from 'react';
import { makeStyles, Typography } from '../../../MaterialUI/Import/Import';
import Button from '../../../MaterialUI/Component/Button/Button';
import { withRouter } from 'react-router-dom';
import TopBar from '../../../MaterialUI/Component/TopBar/TopBar';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const LandingHeader = (props) => {
  const classes = useStyles();
  const loginButtonHandle = () => {
    props.history.push('/login');
  };
  const dashboardButtonHandle = () => {
    props.history.push('/dashboard');
  };
  return (
    <TopBar>
      <Typography variant='h6' className={classes.title}>
        Fluxo
      </Typography>
      <Button
        buttonColor='primary'
        buttonText={props.isAuthorized ? 'Dashboard' : 'Login'}
        variant='contained'
        buttonClickHandle={
          props.isAuthorized ? dashboardButtonHandle : loginButtonHandle
        }
      />
    </TopBar>
  );
};

export default withRouter(LandingHeader);
