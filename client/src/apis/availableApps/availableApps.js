const availableApps = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  return {
    resData: data,
    httpStatus: res.status,
  };
};

const triggerEvents = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  const data = res.json();
  return data;
};

const accountsList = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
};
const fetchThirdParyInput = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
};
export { availableApps, triggerEvents, accountsList, fetchThirdParyInput };
