import constants from '../../constants/constants';

const getApps = async () => {
  const res = await fetch(`${constants.serverURL}/apps`, {
    method: 'GET',
    credentials: 'include'
  });
  const resData = await res.json();
  return resData;
};

export default { getApps };
