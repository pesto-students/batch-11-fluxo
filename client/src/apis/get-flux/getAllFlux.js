const getAllFluxApi = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
};

export { getAllFluxApi };
