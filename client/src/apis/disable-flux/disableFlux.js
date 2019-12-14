const disableFlux = async (url, disableData) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(disableData),
  });

  const data = await res.json();

  return data;
};

export { disableFlux };
