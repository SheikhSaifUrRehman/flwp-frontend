const initState = {
  userRequestsList: [],
  userRequest: {},
  searchInfo: [],
  searchCurrent: []
}; 
 
const userRequestsReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_REQUESTS": 
      return { ...state, userRequestsList: action.payload.userRequestsList };
    case "SET_USER_REQUEST":
      return { ...state, userRequest: action.payload.userRequest };
    case "SET_SEARCH_INFO":
      return { ...state, searchInfo: action.payload.searchInfo };
    case "SET_SEARCH_FORM": 
      return { ...state, searchCurrent: action.payload.searchCurrent };
    default:
      return state;
  } 
};

export default userRequestsReducer;
