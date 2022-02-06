import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { v4 as uuid } from "uuid";

function ContactList() {
  const [contacts, setContacts] = useState([
    { id: uuid(), name: "yunip" },
    { id: uuid(), name: "sam" },
    { id: uuid(), name: "ram" },
    { id: uuid(), name: "hari" },
  ]);
  return (
    <Container>
      <Button
        colot="dark"
        onClick={() => {
          const name = prompt("Enter Item");
          if (name) {
            setContacts((prevState) => [...prevState, { id: uuid(), name }]);
          }
        }}
      >
        Add Contact
      </Button>

      <ListGroup>
        {contacts.map(({ id, name }) => (
          <ListGroup.Item key={id}>
            <Button
              className="remove-btn"
              variant="danger"
              onClick={() => {
                setContacts((prevState) =>
                  prevState.filter((contact) => contact.id !== id)
                );
              }}
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
