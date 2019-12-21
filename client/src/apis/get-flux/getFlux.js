import constants from '../../constants/constants';

const getFlux = async (fluxId) => {
  const url = `${constants.serverURL}/flux/${fluxId}`;

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
};

const getFluxHistory = async (fluxId) => {
  const url = `${constants.serverURL}/flux/history/${fluxId}`;

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
};

export { getFlux, getFluxHistory };
