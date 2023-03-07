import axios from "axios";
import { path } from "./../path";

export const setWorkersHomePage = () => async (dispatch) => {
  const url = `${path}api/workers/home-page`;
  const workers = await axios.get(url);

  dispatch({
    type: "SET_WORKERS",
    payload: {
      workerList: workers.data,
    },
  });
}; 

export const setWorkers = () => async (dispatch) => {
  const pageSize = 6;
  const url = `${path}api/workers/all?pageNumber=1&pageSize=${pageSize}`;
  const workers = await axios.get(url);

  console.log(workers);

  dispatch({
    type: "SET_WORKERS",
    payload: {
      workerList: workers.data,
    },
  });
};

export const setWorker = (id) => async (dispatch) => {
  const url = `${path}api/workers/single/${id}`;
  const worker = await axios.get(url);

  dispatch({
    type: "SET_WORKER",
    payload: {
      worker: worker.data,
    },
  });
};

export const setSearchInfo = () => async (dispatch) => {
  const url = `${path}api/search/info/workers`;
  const info = await axios.get(url);

  console.log(info);
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
  const url = `${path}api/search/workers/?subCategory=${data.subCategory_id}&area=${data.area_id}`;
  const info = await axios.get(url);

  dispatch({
    type: "SET_WORKERS",
    payload: {
      workerList: { workers: info.data.result },
    },
  });

  console.log(info);
};
