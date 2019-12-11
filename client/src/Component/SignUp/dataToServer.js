const dataToServer = async (formData) => {
  const res = await fetch('/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const resData = await res.json();
  return {
    resData,
  };
};

export { dataToServer };
