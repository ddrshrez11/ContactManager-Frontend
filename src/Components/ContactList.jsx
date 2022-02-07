import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { connect, useDispatch } from "react-redux";
import { getContacts, deleteContact } from "../Actions/contactActions";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { AddContactModal } from "./AddContactModal";

function ContactList(props) {
  // const contact = useSelector((state) => state.contact);
  // console.log(contact.contacts);
  useEffect(() => {
    props.getContacts();
  }, []);
  const { contacts } = props.contact;

  const onDeleteClick = (id) => {
    props.deleteContact(id);
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
        {contacts.map(({ _id, name }) => (
          <ListGroup.Item key={_id}>
            <Button
              className="remove-btn"
              variant="danger"
              onClick={() => onDeleteClick(_id)}
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

ContactList.propTypes = {
  getContacts: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact,
});

export default connect(mapStateToProps, { getContacts, deleteContact })(
  ContactList
);
