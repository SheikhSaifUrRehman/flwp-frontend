import axios from "axios";

export const setLoginModal = (data) => async (dispatch) => {
  dispatch({
    type: "SET_LOGIN_MODAL",
    payload: { 
      loginModal: data,
    },
  });
};  

export const setSignupModal = (data) => async (dispatch) => {
  dispatch({
    type: "SET_SIGNUP_MODAL",
    payload: {
      signupModal: data,
    },
  });
};

export const setVerificationModal = (data) => async (dispatch) => {
  dispatch({
    type: "SET_VERIFICATION_MODAL",
    payload: { 
      varificationModal: data,
    },
  });
};

export const setCategoryModal = (data) => async (dispatch) => {
  dispatch({
    type: "SET_CATEGORY_MODAL",
    payload: {
      categoryModal: data,
    },
  });
};

export const setTeamModal = (data) => async (dispatch) => {
  dispatch({
    type: "SET_TEAM_MODAL",
    payload: {
      teamModal: data,
    },
  });
};
 