import axios from "axios";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACTS_LOADING,
} from "./Types";

export const getContacts = () => (dispatch) => {
  dispatch(setContactsLoading());
  axios.get("http://localhost:5000/api/contact").then((res) =>
    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    })
  );
};
export const addContact = (newContact) => (dispatch) => {
  axios.post("http://localhost:5000/api/contact", newContact).then((res) => {
    dispatch({
      type: ADD_CONTACT,
      payload: newContact,
    });
  });
  return {
    type: ADD_CONTACT,
    payload: newContact,
  };
};
export const deleteContact = (id) => (dispatch) => {
  axios.delete(`http://localhost:5000/api/contact/${id}`).then((res) =>
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    })
  );
  return {
    type: DELETE_CONTACT,
    payload: id,
  };
};
export const setContactsLoading = (id) => {
  return {
    type: CONTACTS_LOADING,
  };
};
