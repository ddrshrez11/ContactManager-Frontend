import axios from "axios";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACTS_LOADING,
} from "./Types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getContacts = () => (dispatch) => {
  dispatch(setContactsLoading());
  axios
    .get("http://localhost:5000/api/contact")
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
    .post(
      "http://localhost:5000/api/contact",
      newContact,
      tokenConfig(getState)
    )
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

export const deleteContact = (id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:5000/api/contact/${id}`, tokenConfig(getState))
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
export const setContactsLoading = (id) => {
  return {
    type: CONTACTS_LOADING,
  };
};
