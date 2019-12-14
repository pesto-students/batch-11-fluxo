import React from 'react';
import Modal from '../../../MaterialUI/Component/Modal/Modal';
import style from './DeleteFluxModal.module.scss';
import Button from '../../../MaterialUI/Component/Button/Button';

const DeleteFluxModal = (props) => {
  return (
    <Modal open={props.modalOpen} handleClose={props.handleClose}>
      <div className={style.ModalBox}>
        <h3>This flux will be deleted permanently.</h3>
        <h3>Do you want to delete?</h3>
        <div className={style.ButtonGroup}>
          <Button
            buttonColor='primary'
            buttonText='YES'
            variant='contained'
            buttonClickHandle={props.yesClickHandle}
          />
          <Button
            buttonColor='primary'
            buttonText='NO'
            variant='contained'
            buttonClickHandle={props.noClickHandle}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteFluxModal;
