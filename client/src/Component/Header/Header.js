import React from 'react';
import TopBar from '../../MaterialUI/Component/TopBar/TopBar';
import Menu from '../../MaterialUI/Component/Menu/Menu';
import { makeStyles, Typography } from '../../MaterialUI/Import/Import';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  menu: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const homeClickHandle = () => {
    window.location.href = '/';
  };
  return (
    <TopBar>
      <Typography
        variant='h6'
        className={classes.title}
        onClick={homeClickHandle}
      >
        Fluxo
      </Typography>
      <Typography variant='h6' className={classes.title}>
        {props.pageName}
      </Typography>
      <Menu />
    </TopBar>
  );
};

export default Header;
