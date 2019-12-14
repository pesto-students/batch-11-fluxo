import React from 'react';
import style from './Card.module.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import Toggle from '../Toggle/Toggle';

const Card = (props) => {
  return (
    <div className={style.Card}>
      <div className={style.MidBox}>
        <h3 style={{ color: '#5a3796' }}>{props.fluxName} </h3>
        <h4 style={{ color: '#851e3e' }}>
          {props.eventApp} > {props.actionApp}
        </h4>
        <h4 style={{ color: '#5a3796' }}>{props.createdAt}</h4>
      </div>
      <div className={style.LastBox}>
        <DeleteIcon
          style={{ cursor: 'pointer' }}
          onClick={props.deleteHandle}
        />
        <Toggle fluxId={props.fluxId} isEnable={props.isEnable} />
      </div>
    </div>
  );
};

export default Card;
