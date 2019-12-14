import React from 'react';
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

const CustomizedMenus = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <StyledMenuItem>
          <ListItemIcon>
            <DashboardIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <AddIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Create Flux' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Setting' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default CustomizedMenus;
