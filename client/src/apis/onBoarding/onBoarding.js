const userInfoToServer = async (formData, url) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });
  const resData = await res.json();
  return resData;
};

export { userInfoToServer };
