 import { combineReducers } from "redux";
import workerReducer from "./workers";
import categoryReducer from "./categories";
import usersReducer from "./users";
import modalsReducer from "./modals";
import loadingReducer from "./loading";
import userRequests from "./userRequests";

const rootReducer = combineReducers({
  workers: workerReducer,
  categories: categoryReducer,
  user: usersReducer,
  modals: modalsReducer,
  isLoading: loadingReducer,
  userRequests: userRequests
});

export default rootReducer;
