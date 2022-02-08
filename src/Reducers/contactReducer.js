import {
  GET_CONTACTS,
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  CONTACTS_LOADING,
} from "../Actions/Types";

const initialState = {
  contacts: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
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
          (contact) => contact._id !== action.payload
        ),
      };
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact._id === action.payload._id)
            return {
              ...contact,
              ...action.payload,
            };
          else {
            return contact;
          }
        }),
        contacts: [action.payload, ...state.contacts],
      };
    case CONTACTS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default contactReducer;
