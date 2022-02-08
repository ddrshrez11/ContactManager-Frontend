import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addContact } from "../Actions/contactActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ActionButton from "./ActionButton";

export const AddContactModal = () => {
  const [contactInfo, setContactInfo] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  // const contact = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setContactInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const modalToggle = () => {
    setModalShow((prevState) => !prevState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();

    const newContact = {
      name: contactInfo.name,
      number: contactInfo.number,
    };
    console.log(contactInfo);
    // Add Item Action
    dispatch(addContact(newContact));
  };
  return (
    <div>
      <Button variant="primary" onClick={modalToggle}>
        Add Contact
      </Button>
      <Modal
        show={modalShow}
        onHide={modalToggle}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formContactName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContactNum">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="numeric"
                name="number"
                placeholder="Enter Number"
                onChange={onChange}
              />
            </Form.Group>
            <ActionButton text="Add Contact" />
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddContactModal;
