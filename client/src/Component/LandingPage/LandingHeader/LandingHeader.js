import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appHeader}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Fluxo
          </Typography>
          <Button color='inherit'>{props.buttonText}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LandingHeader;
