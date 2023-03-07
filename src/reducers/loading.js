const initState = {
  loading: false,
};

const loadingReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
};

export default loadingReducer;
 