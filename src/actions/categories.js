import axios from "axios";
import {path} from './../path';


export const setCategories = () => async (dispatch) => {
  let url = `${path}api/categories/all`;
  const categories = await axios.get(url);

  dispatch({
    type: "SET_CATEGORIES",
    payload: {
      categoryList: categories.data,
    },
  });

};

export const setCategoriesHomePage = () => async (dispatch) => {
  let url = `${path}api/categories/home-page`;
  const categories = await axios.get(url);
 
  dispatch({
    type: "SET_CATEGORIES",
    payload: {
      categoryList: categories.data,
    },
  });
};

export const setCategory = (category) => async (dispatch) => {
  dispatch({
    type: "SET_CATEGORY",
    payload: {
      category: category,
    },
  });
};
