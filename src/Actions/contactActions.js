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

export const getContacts = () => (dispatch, getState) => {
  dispatch(setContactsLoading());
  axios
    .get("http://localhost:5000/contacts", tokenConfig(getState))
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
    .post("http://localhost:5000/contacts", newContact, tokenConfig(getState))
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
      `http://localhost:5000/contacts/${id}`,
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
    .delete(`http://localhost:5000/contacts/${id}`, tokenConfig(getState))
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
      "http://localhost:5000/contacts/upload",
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
