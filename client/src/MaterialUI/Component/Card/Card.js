import React from 'react';
import style from './Card.module.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Toggle from '../Toggle/Toggle';

const Card = (props) => {
  return (
    <div className={style.Card}>
      <div className={style.FirstBox}>
        <Toggle />
      </div>
      <div className={style.MidBox}>
        <h3 style={{ color: '#03DAC6' }}>{props.fluxName} </h3>
        <h4>Last Executed at : {props.executionTime}</h4>
        <h4 style={{ color: 'green' }}>Success : {props.successFlux}</h4>
        <h4 style={{ color: 'red' }}>Failure : {props.failureFlux}</h4>
      </div>
      <div className={style.LastBox}>
        <DeleteIcon
          style={{ cursor: 'pointer' }}
          onClick={props.deleteHandle}
        />
        <EditIcon style={{ cursor: 'pointer' }} onClick={props.editHandle} />
      </div>
    </div>
  );
};

export default Card;
