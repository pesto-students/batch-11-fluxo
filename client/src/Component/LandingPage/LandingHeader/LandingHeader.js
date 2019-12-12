import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
} from '../../../MaterialUI/Import/Import';
import Button from '../../../MaterialUI/Component/Button/Button';
import { withRouter } from 'react-router-dom';

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
  const loginButtonHandle = () => {
    props.history.push('/login');
  };
  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appHeader}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Fluxo
          </Typography>
          <Button
            buttonColor='primary'
            buttonText='Login'
            variant='contained'
            buttonClickHandle={loginButtonHandle}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(LandingHeader);
