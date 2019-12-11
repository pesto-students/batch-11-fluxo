export const sendSuccessMessage = (res, data, status) => {
  if (status !== undefined) {
    res.status(status);
  } else {
    res.status(200);
  }
  res.send({ status: 'success', data });
};

export const sendFailureMessage = (res, data, status) => {
  if (status !== undefined) {
    res.status(status);
  } else {
    res.status(500);
  }
  res.send({ status: 'failure', data });
};
