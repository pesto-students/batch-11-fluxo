const createFluxApi = async (url, fluxData) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(fluxData),
  });
  const data = await res.json();
  return data;
};

export { createFluxApi };
