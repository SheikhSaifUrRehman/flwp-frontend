import axios from "axios";

export const setLoading = (data) => async (dispatch) => {
  dispatch({
    type: "SET_LOADING",
    payload: {
      loading: data,
    },
  });
};  
  