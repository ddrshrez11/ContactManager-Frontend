import { v4 as uuid } from "uuid";
import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT } from "../Actions/Types";

const initialState = {
  contacts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
