import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const SimpleSnackbar = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.snackBarOpen}
        autoHideDuration={3000}
        onClose={props.cancelButtonHandle}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>{props.message}</span>}
        action={[
          <Button
            key='undo'
            color='secondary'
            size='small'
            onClick={props.undoHandle}
          >
            UNDO
          </Button>,
          <IconButton
            key='close'
            aria-label='close'
            color='inherit'
            className={classes.close}
            onClick={props.cancelButtonHandle}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

export default SimpleSnackbar;
