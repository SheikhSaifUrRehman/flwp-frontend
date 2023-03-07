const initState = {
  user: {},
  isLoggedIn: false,
  tempToken: '',
  token: '',
  refreshToken: '',
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload.user };
    case 'SET_ISLOGGED':
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    case 'SET_TOKEN':
      return { ...state, token: action.payload.token };
    case 'SET_REFRESH_TOKEN':
      return { ...state, refreshToken: action.payload.refreshToken };
    default:
      return state;
  }
};

export default usersReducer;
