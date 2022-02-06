import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT } from "./Types";

export const getContacts = () => {
  return {
    type: GET_CONTACTS,
  };
};
export const addContact = (newContact) => {
  return {
    type: ADD_CONTACT,
    payload: newContact,
  };
};
export const deleteContact = (id) => {
  return {
    type: DELETE_CONTACT,
    payload: id,
  };
};
