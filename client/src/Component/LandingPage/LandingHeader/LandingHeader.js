import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
} from '../../../MaterialUI/Import/Import';
import Button from '../../../MaterialUI/Component/Button/Button';
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

const LandingHeader = () => {
  const classes = useStyles();

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
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LandingHeader;
