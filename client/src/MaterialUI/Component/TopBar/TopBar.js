import React from 'react';
import { makeStyles, AppBar, Toolbar } from '../../../MaterialUI/Import/Import';

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

const TopBar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appHeader}>
        <Toolbar>{props.children}</Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
