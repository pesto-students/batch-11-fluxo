const userDetails = async (url) => {
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

export { userDetails };
