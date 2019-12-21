import React, { useState, useEffect } from 'react';
import style from './Dashboard.module.scss';
import Card from '../../MaterialUI/Component/Card/Card';
import Header from '../Header/Header';
import { getAllFluxApi } from '../../apis/get-flux/getAllFlux';
import { deleteFlux } from '../../apis/delete-flux/deleteFlux';
import constants from '../../constants/constants';
import { timeAgo } from './flux-creation-time/timeAgo';
import Spinner from '../../MaterialUI/Component/Spinner/Spinner';
import NoFluxView from './NoFluxView/NoFluxView';
import DeleteFluxModal from './DeleteFluxModal/DeleteFluxModal';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [allFluxes, setAllFluxes] = useState([]);
  const [deleteFluxId, setDeleteFluxId] = useState('');
  const [deleteModalState, changeDeleteModalState] = useState({
    modalOpen: false,
  });

  useEffect(() => {
    const allFluxes = async () => {
      setLoading(true);
      const url = `${constants.serverURL}/flux`;
      const res = await getAllFluxApi(url);
      if (res) {
        setLoading(false);
      }
      if (res.status === 'failure') {
        window.location.href = '/login';
      }
      setAllFluxes(res.data);
    };
    allFluxes();
  }, []);

  const deleteModalOpen = (id) => {
    changeDeleteModalState({
      modalOpen: true,
    });
    setDeleteFluxId(id);
  };

  const deleteModalClose = () => {
    changeDeleteModalState({
      modalOpenStatus: false,
    });
  };

  const historyHandle = (id) => {
    window.location.href = `/history/${id}`
  }

  const noClickHandle = () => {
    changeDeleteModalState({
      modalOpen: false,
    });
  };
  const yesClickHandle = async () => {
    setLoading(true);
    const url = `${constants.serverURL}/flux/${deleteFluxId}`;
    const res = deleteFlux(url);
    if (res) {
      setLoading(false);
    }
    changeDeleteModalState({
      modalOpen: false,
    });
    const newAllFluxes = allFluxes.filter((flux) => flux._id !== deleteFluxId);
    setAllFluxes(newAllFluxes);
  };
  const cards = allFluxes.map((flux) => {
    return (
      <div key={flux._id} className={style.ChildCard}>
        <Card
          isEnable={flux.isEnable}
          fluxId={flux._id}
          key={flux._id}
          deleteHandle={() => deleteModalOpen(flux._id)}
          historyHandle={() => historyHandle(flux._id)}
          fluxName={flux.name}
          eventApp={flux.eventApp}
          createdAt={timeAgo.inWords(new Date(flux.creationDate).getTime())}
          actionApp={flux.actionApp}
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
        yesClickHandle={yesClickHandle}
      />
      <Header pageName='Dashboard' />
      {loading ? (
        <Spinner />
      ) : allFluxes.length === 0 ? (
        <NoFluxView />
      ) : (
        <div className={style.MainConatiner}>{cards}</div>
      )}
    </div>
  );
};

export default Dashboard;
