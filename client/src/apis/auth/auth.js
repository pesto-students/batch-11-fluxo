import constants from '../../constants/constants';
const auth = async () => {
  const url = `${constants.serverURL}/users/auth`;
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  if (res.status !== 401 && data.status === 'success') {
    return {
      isAuthorized: true,
    };
  } else {
    return {
      isAuthorized: false,
    };
  }
};

export { auth };
