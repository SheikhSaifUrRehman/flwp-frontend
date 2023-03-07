const initState = {
  workerList: [],
  worker: {}, 
  searchInfo: [],
  searchCurrent: [] 
};  
  
const workerReducer = (state = initState, action) => {  
  switch (action.type) { 
    case "SET_WORKERS":
      return { ...state, workerList: action.payload.workerList };
    case "APPEND_WORKERS":
        return { ...state, workerList: {...state.workerList, workers: [action.payload.workerList.workers] } };
    case "SET_WORKER":
      return { ...state, worker: action.payload.worker };
    case "SET_SEARCH_INFO":
      return { ...state, searchInfo: action.payload.searchInfo };
    case "SET_SEARCH_FORM": 
      return { ...state, searchCurrent: action.payload.searchCurrent };
    default:
      return state;
  }
}; 
 
export default workerReducer;


//  {...state.notes, [action.payload.noteId]: action.payload }