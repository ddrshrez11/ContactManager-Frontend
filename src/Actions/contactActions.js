import axios from "axios";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  UPLOAD_IMAGE,
  CONTACTS_LOADING,
} from "./Types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import Constants from "../Constants";

export const getContacts = (id) => (dispatch, getState) => {
  dispatch(setContactsLoading());
  axios
    .get(`${Constants.baseURL}/contacts`, tokenConfig(getState), id)
    .then((res) =>
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addContact = (newContact) => (dispatch, getState) => {
  axios
    .post(`${Constants.baseURL}/contacts`, newContact, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editContact = (id, contactData) => (dispatch, getState) => {
  axios
    .put(
      `${Constants.baseURL}/contacts/${id}`,
      contactData,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: EDIT_CONTACT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteContact = (id) => (dispatch, getState) => {
  axios
    .delete(`${Constants.baseURL}/contacts/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const uploadImage = (image) => (dispatch, getState) => {
  let formData = new FormData();
  formData.set("photo", image);
  axios
    .post(
      `${Constants.baseURL}/contacts/upload`,
      formData,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: UPLOAD_IMAGE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const setContactsLoading = (id) => {
  return {
    type: CONTACTS_LOADING,
  };
};
