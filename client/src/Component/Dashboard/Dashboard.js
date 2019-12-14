import React, { useState } from 'react';
import style from './Dashboard.module.scss';
import Card from '../../MaterialUI/Component/Card/Card';
import Header from '../Header/Header';
import { fluxData } from './dashboardConfig';
import DeleteFluxModal from './DeleteFluxModal/DeleteFluxModal';

const Dashboard = () => {
  const [fluxState, changeFluxState] = useState({ ...fluxData });

  const [deleteModalState, changeDeleteModalState] = useState({
    modalOpen: false,
  });

  const deleteModalOpen = () => {
    changeDeleteModalState({
      modalOpen: true,
    });
  };

  const deleteModalClose = () => {
    changeDeleteModalState({
      modalOpenStatus: false,
    });
  };

  const editHandle = () => {
    console.log('I am edit');
  };

  const noClickHandle = () => {
    changeDeleteModalState({
      modalOpen: false,
    });
  };

  const cards = Object.keys(fluxState).map((i) => {
    return (
      <div className={style.ChildCard}>
        <Card
          key={i.fluxName}
          deleteHandle={deleteModalOpen}
          editHandle={editHandle}
          fluxName={fluxState[i].fluxName}
          executionTime={fluxState[i].executionTime}
          successFlux={fluxState[i].successFlux}
          failureFlux={fluxState[i].failureFlux}
        />
      </div>
    );
  });
  return (
    <div>
      <DeleteFluxModal
        handleClose={deleteModalClose}
        modalOpen={deleteModalState.modalOpen}
        noClickHandle={noClickHandle}
      />
      <Header pageName='Dashboard' />
      <div className={style.MainConatiner}>{cards}</div>
    </div>
  );
};

export default Dashboard;
