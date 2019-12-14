const constants = {
  serverURL:
    process.env.REACT_APP_API_URL ||
    'http://localhost:3000' ||
    'https://db9ac005.ngrok.io',
};

Object.freeze(constants);

export default constants;
