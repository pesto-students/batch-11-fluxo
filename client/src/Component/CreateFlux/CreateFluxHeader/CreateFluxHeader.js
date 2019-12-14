import React from 'react';
import TopBar from '../../../MaterialUI/Component/TopBar/TopBar';
import Menu from '../../../MaterialUI/Component/Menu/Menu';
import { makeStyles, Typography } from '../../../MaterialUI/Import/Import';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  menu: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
}));

const CreateFluxHeader = () => {
  const classes = useStyles();
  return (
    <TopBar>
      <Typography variant='h6' className={classes.title}>
        Fluxo
      </Typography>
      <Typography variant='h6' className={classes.title}>
        New Flux
      </Typography>
      <Menu />
    </TopBar>
  );
};

export default CreateFluxHeader;
