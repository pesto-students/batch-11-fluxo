import React from 'react';
import constants from '../../../constants/constants';
import { logout } from '../../../apis/logout/logout';
import { connect } from 'react-redux';
import {
  Menu,
  MenuItem,
  withStyles,
  ListItemIcon,
  ListItemText,
  MenuIcon,
  DashboardIcon,
  AddIcon,
  SettingsIcon,
  ExitToAppIcon,
} from '../../Import/Import';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid primary',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const CustomizedMenus = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickHandle = async (e) => {
    switch (e.target.innerText) {
      case 'Dashboard':
        window.location.href = '/dashboard';
        return;

      case 'Create Flux':
        window.location.href = '/fluxing';
        return;

      case 'Setting':
        window.location.href = '/setting';
        return;

      case 'Logout':
        const url = `${constants.serverURL}/users/logout`;
        const res = await logout(url);
        props.loggingOut(res.status);
        window.location.href = '/';
        return;

      default:
        return;
    }
  };
  return (
    <div>
      <MenuIcon
        style={{ cursor: 'pointer' }}
        aria-controls='customized-menu'
        aria-haspopup='true'
        fontSize='large'
        onClick={handleClick}
      />
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={(e) => clickHandle(e)}>
          <ListItemIcon>
            <DashboardIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </StyledMenuItem>
        <StyledMenuItem onClick={(e) => clickHandle(e)}>
          <ListItemIcon>
            <AddIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Create Flux' />
        </StyledMenuItem>
        <StyledMenuItem onClick={(e) => clickHandle(e)}>
          <ListItemIcon>
            <SettingsIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Setting' />
        </StyledMenuItem>
        <StyledMenuItem onClick={(e) => clickHandle(e)}>
          <ListItemIcon>
            <ExitToAppIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loggingOut: (value) => {
      dispatch({ type: 'LOGOUT_ACTION', value });
    },
  };
};
export default connect(null, mapDispatchToProps)(CustomizedMenus);
