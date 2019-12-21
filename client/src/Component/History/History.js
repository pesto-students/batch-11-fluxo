import React, { useState, useEffect } from 'react';
import style from './History.module.scss';
import Header from '../Header/Header';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getFlux, getFluxHistory } from '../../apis/get-flux/getFlux';
import Button from '../../MaterialUI/Component/Button/Button';

const History = (props) => {
  const [flux, setFlux] = useState({ name: 'Loding' });
  const [fluxHistory, setFluxHistory] = useState([]);
  const { fluxId } = props.match.params;

  useEffect(() => {
    const getFluxData = async () => {
      const res = await getFlux(fluxId);
      if (res.status === 'failure') {
        window.location.href = '/login';
      }
      console.log(res.data);
      setFlux(res.data);
    };

    const getFluxHistoryData = async () => {
      const res = await getFluxHistory(fluxId);
      if (res.status === 'failure') {
        window.location.href = '/login';
      }
      console.log(res.data);
      setFluxHistory(res.data);
    };

    getFluxData();
    getFluxHistoryData();
  }, [fluxId]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`
  }

  return (
    <div>
      <Header pageName='History' />
      <div className={style.HeadContainer}>
        <h1>{flux.name}</h1>
      </div>
      <div className={style.TableContainer}>
        <TableContainer component={Paper} >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">status</TableCell>
                <TableCell align="left">time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fluxHistory.map(flux => (
                <TableRow key={flux._id}>
                  <TableCell component="th" scope="row">
                    {flux._id}
                  </TableCell>
                  <TableCell align="left">{flux.status ? 'Success' : 'Failed'}</TableCell>
                  <TableCell align="left">{formatDate(flux.updatedTime)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={style.HeadContainer}>
        <Button
          buttonText='Back'
          buttonColor='primary'
          variant='contained'
          buttonClickHandle={() => { props.history.push('/dashboard') }}
        />
      </div>
    </div>
  );
};

export default History;
