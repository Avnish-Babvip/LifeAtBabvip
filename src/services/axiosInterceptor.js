import axios from "axios";
import { resetUserState } from "../features/slices/authentication";


// This code is used to access redux store in this file.
let store;
export const injectStore = (_store) => {
  store = _store;
};

// Creating new axios instance
export const instance = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_API_BASE_URL_PRODUCTION}`,
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      console.log("hi")
      if (error.response?.status === 401) {
        store.dispatch(resetUserState());
        
      }
      return Promise.reject(error);
    }
  );