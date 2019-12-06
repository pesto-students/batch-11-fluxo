const initialState = {
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_UP_TOKEN':
      return {
        ...state,
        isAuthenticated: action.token ? true : false,
      };

    case 'CHECK_COOKIE':
      return {
        ...state,
        isAuthenticated: action.token ? true : false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
