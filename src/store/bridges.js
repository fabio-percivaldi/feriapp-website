// src/js/store/index.js
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/bridges";
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);
export default store;