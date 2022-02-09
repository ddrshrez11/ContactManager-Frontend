import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../Actions/Types";
import Constants from "../Constants";
import { returnErrors } from "./errorActions";

//Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });
  axios
    .get(`${Constants.baseURL}/user`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// send token with Request Header
export const tokenConfig = (getState) => {
  //Get token from local storage
  const token = getState().auth.token;

  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

//Sign Up User
export const signup =
  ({ name, email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    axios
      .post(`${Constants.baseURL}/signup`, body, config)
      .then((res) =>
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "SIGNUP_FAIL")
        );
        dispatch({
          type: SIGNUP_FAIL,
        });
      });
  };

//Sign In User
export const signin =
  ({ email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });
    axios
      .post(`${Constants.baseURL}/signin`, body, config)
      .then((res) =>
        dispatch({
          type: SIGNIN_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "SIGNIN_FAIL")
        );
        dispatch({
          type: SIGNIN_FAIL,
        });
      });
  };

//SignOut
export const signout = () => {
  return {
    type: SIGNOUT_SUCCESS,
  };
};
