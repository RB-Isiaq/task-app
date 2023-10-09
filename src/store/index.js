import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";

const config = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  tasks: taskReducer,
  user: userReducer,
});

const presisted = persistReducer(config, reducer);

export const store = configureStore({
  reducer: presisted,
});

export default store;
