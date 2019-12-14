const deleteFlux = async (url) => {
  const res = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
  });
  const data = await res.json();

  return data;
};

export { deleteFlux };
