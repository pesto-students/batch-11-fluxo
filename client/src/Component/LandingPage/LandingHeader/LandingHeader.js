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
      {props.isAuthorized ? (
        <Button
          buttonColor='primary'
          buttonText='My Dashboard'
          variant='contained'
          buttonClickHandle={dashboardButtonHandle}
        />
      ) : (
        <Button
          buttonColor='primary'
          buttonText='Login'
          variant='contained'
          buttonClickHandle={loginButtonHandle}
        />
      )}
    </TopBar>
  );
};

export default withRouter(LandingHeader);
