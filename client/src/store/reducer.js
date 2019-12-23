const initialState = {
  logout: false,
  createFluxInfo: {
    actionInputs: {},
    eventInputs: {},
  },
  pausingFlux: false,
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
          ...action.value,
        },
      };

    case 'ACTION_INFO':
        console.log(action.value, state.createFluxInfo);
      return {
        ...state,
        createFluxInfo: {
          ...state.createFluxInfo,
          ...action.value,
        },
      };
    case 'EVENT_INPUTS':
      console.log(action.value, state.createFluxInfo);
      return {
        ...state,
        createFluxInfo: {
          ...state.createFluxInfo,
          eventInputs: {
            ...action.value,
          },
        },
      };
    case 'ACTION_INPUTS':
        console.log(action.value, state.createFluxInfo);
      return {
        ...state,
        createFluxInfo: {
          ...state.createFluxInfo,
          actionInputs: {
            ...action.value,
          },
        },
      };

    case 'LOGOUT_ACTION':
      return {
        logout: true,
      };

    case 'FLUX_PAUSING':
      return {
        ...state,
        createFluxInfo: {
          ...state.createFluxInfo,
        },
        pausingFlux: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
