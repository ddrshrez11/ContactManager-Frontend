import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addContact } from "../Actions/contactActions";

export const AddContactModal = (props) => {
  const [contactInfo, setContactInfo] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setContactInfo({ [e.target.name]: e.target.value });
    console.log(contactInfo);
  };

  const modalToggle = () => {
    setModalShow((prevState) => !prevState);
  };

  const onSubmit = (e) => {
    console.log("here");
    e.preventDefault();
    // e.stopPropagation();

    const newContact = {
      id: uuid(),
      name: contactInfo.name,
    };

    // Add Item Action
    dispatch(addContact(newContact));

    //close Model
    modalToggle();
  };

  return (
    <div>
      <Button variant="primary" onClick={modalToggle}>
        Add Contact
      </Button>
      <Modal
        show={modalShow}
        size="lg"
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
                placeholder="Enter Name"
                name="name"
                onChange={onChange}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={modalToggle}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contact: state.contact,
});

const mapDispatchToProps = { addContact };

export default connect(mapStateToProps, mapDispatchToProps)(AddContactModal);
