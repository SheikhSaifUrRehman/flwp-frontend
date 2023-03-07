const initState = {
  categoryList: [],
  category: {},
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categoryList: action.payload.categoryList };
    case "GET_CATEGORIES":
      return { ...state };
    case "SET_CATEGORY":
      return { ...state, category: action.payload.category };
    case "GET_CATEGORY":
      return { ...state };
    default:
      return state;
  }
};

export default categoryReducer;
