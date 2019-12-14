const initialState = {
  logout: false,
  createFluxInfo: {
    actionInputs: {},
    eventInputs: {},
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FLUX_NAME':
      return {
        ...state,
        createFluxInfo: {
          ...state.createFluxInfo.actionInputs,
          ...state.createFluxInfo.eventInputs,
          name: action.value,
        },
      };

    case 'EVENT_INFO':
      return {
        ...state,
        createFluxInfo: {
          ...state.createFluxInfo,
          ...state.createFluxInfo.actionInputs,
          ...state.createFluxInfo.eventInputs,
          ...action.value,
        },
      };

    case 'ACTION_INFO':
      return {
        ...state,
        createFluxInfo: {
          ...state.createFluxInfo,
          ...state.createFluxInfo.actionInputs,
          ...state.createFluxInfo.eventInputs,
          ...action.value,
        },
      };
    case 'EVENT_INPUTS':
      return {
        ...state,
        createFluxInfo: {
          ...state.createFluxInfo,
          ...state.createFluxInfo.actionInputs,
          eventInputs: {
            ...action.value,
          },
        },
      };
    case 'ACTION_INPUTS':
      return {
        ...state,
        createFluxInfo: {
          ...state.createFluxInfo,
          ...state.createFluxInfo.eventInputs,
          actionInputs: {
            ...action.value,
          },
        },
      };

    case 'LOGOUT_ACTION':
      return {
        logout: true,
      };
    default:
      return state;
  }
};

export default reducer;
