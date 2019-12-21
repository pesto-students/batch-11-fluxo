import React from 'react';
import IntegrateButton from '../../../Component/IntegrateButton/IntegrateButton';
import {
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '../../Import/Import';

let minWidth = 300;
const SimpleSelect = (props) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: minWidth,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const itemList = props.itemList;
  const menuList = itemList.map((i) => {
    return (
      <MenuItem
        key={i.value}
        value={i.value}
        onStatusChange={props.onStatusChange}
      >
        {i.displayValue}
      </MenuItem>
    );
  });
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl
      variant='outlined'
      className={classes.formControl}
      required={true}
      disabled={props.disabled}
    >
      <InputLabel ref={inputLabel} id='demo-simple-select-outlined-label'>
        {props.labelText}
      </InputLabel>
      <Select
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        value={props.value || ''}
        onChange={props.handleChange}
        labelWidth={labelWidth}
      >
        {menuList}
        {props.showAddAccount ? (
          <IntegrateButton
            appName={props.appName}
            url={props.url}
            onStatusChange={props.onStatusChange}
          />
        ) : null}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
