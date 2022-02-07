import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { getContacts, deleteContact } from "../Actions/contactActions";
import { AddContactModal } from "./AddContactModal";
import { useSelector, useDispatch } from "react-redux";

function ContactList() {
  const { contacts } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  const onDeleteClick = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <Container>
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

export default ContactList;
