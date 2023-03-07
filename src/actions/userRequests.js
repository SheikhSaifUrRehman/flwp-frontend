import axios from "axios";
import { path } from './../path';


// export const setWorkersHomePage = () => async (dispatch) => {
//   const url = `${path}api/workers/home-page`;
//   const workers = await axios.get(url);

//   dispatch({
//     type: "SET_WORKERS",
//     payload: {
//       workerList: workers.data,   
//     }, 
//   }); 
// }; 

export const setUserRequests = () => async (dispatch) => {
  const url = `${path}api/UserRequest/all`;
  const us = await axios.get(url);
  console.log(us.data.userRequest);
  dispatch({ 
    type: "SET_USER_REQUESTS",
    payload: { 
      userRequestsList: us.data.userRequest,
    },
  });
}; 

export const setUserRequest = id => async (dispatch) => {
  const url = `${path}api/UserRequest/single/${id}`;
  const us = await axios.get(url);
 
  dispatch({
    type: "SET_USER_REQUEST",
    payload: {
      userRequest: us.data.userRequest,
    },
  });
};

export const setSearchInfo = () => async (dispatch) => {
  const url = `${path}api/search/info`;
  const info = await axios.get(url);

  dispatch({
    type: "SET_SEARCH_INFO",
    payload: {
      searchInfo: info.data,
    },
  });
};

export const setSearchCurrent = (data) => async (dispatch) => {
  dispatch({
    type: "SET_SEARCH_FORM",
    payload: {
      searchCurrent: data,
    },
  });
};

export const setSearch = (data) => async (dispatch) => {
  const url = `${path}api/search/userrequests/?category=${data.category_id}&subCategory=${data.subCategory_id}`;
  const info = await axios.get(url);

  dispatch({ 
    type: "SET_USER_REQUESTS",
    payload: { 
      userRequestsList: info.data.result,
    },
  });

  console.log(info);
};
