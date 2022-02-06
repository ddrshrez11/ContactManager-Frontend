import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { connect, useDispatch } from "react-redux";
import { getContacts, deleteContact } from "../Actions/contactActions";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { AddContactModal } from "./AddContactModal";

function ContactList() {
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact);
  console.log(contact.contacts);
  // const { contact } = store.getState();
  // console.log(contact);
  const contacts = contact.contacts;

  // const onAddClick = () => {
  //   const name = prompt("Enter Item");
  //   if (name) {
  //     // setContacts((prevState) => [...prevState, { id: uuid(), name }]);
  //     dispatch(addContact(name));
  //   }
  // };

  const onDeleteClick = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <Container>
      {/* <Button
        colot="dark"
        onClick={() => {
          onAddClick();
        }}
      >
        Add Contact
      </Button> */}
      <AddContactModal />
      <ListGroup>
        {contacts.map(({ id, name }) => (
          <ListGroup.Item key={id}>
            <Button
              className="remove-btn"
              variant="danger"
              onClick={() => onDeleteClick(id)}
            >
              &times;
            </Button>
            {name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

// ContactList.propTypes = {
//   getContacts: PropTypes.func.isRequired,
//   contact: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  contact: state.contact,
});

export default connect(mapStateToProps, { getContacts, deleteContact })(
  ContactList
);
