import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  paper: {
    position: 'absolute',
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    outline: 'none',
    padding: theme.spacing(2, 4, 3),
  },
}));

const SimpleModal = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        className={classes.root}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={props.open}
        onClose={props.handleClose}
      >
        {props.children}
      </Modal>
    </div>
  );
};

export default SimpleModal;
