const initState = {
  loginModal: false,
  signupModal: false,
  varificationModal: false,
  categoryModal: false,
  teamModal: false,
}; 

const modalsReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LOGIN_MODAL":
      return { ...state, loginModal: action.payload.loginModal };
    case "SET_SIGNUP_MODAL":
      return { ...state, signupModal: action.payload.signupModal };
    case "SET_VERIFICATION_MODAL":
      return { ...state, varificationModal: action.payload.varificationModal };
    case "SET_CATEGORY_MODAL":
      return { ...state, categoryModal: action.payload.categoryModal };
    case "SET_TEAM_MODAL":
      return { ...state, teamModal: action.payload.teamModal };
    default:
      return state;
  }
};

export default modalsReducer;
