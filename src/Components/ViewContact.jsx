import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { deleteContact } from "../Actions/contactActions";
import { useSelector, useDispatch } from "react-redux";
import { Col, InputGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Trash from "./Logo/Trash";
import Edit from "./Logo/Edit";
import CloudinaryImg from "./CloudinaryImg";

export const ViewContact = (props) => {
  const [contactInfo, setContactInfo] = useState({});
  const [numbers, setNumbers] = useState([{ category: "Phone", number: "" }]);

  const { contacts } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const imgHeight = 100;
  const imgWidth = 100;

  //get existing data to View
  useEffect(() => {
    const dispContact = contacts.find((contact) => contact._id === params.id);
    console.log(dispContact);
    setContactInfo({ ...dispContact });
    setNumbers([...dispContact.numbers]);
  }, []);

  //Delete Contact
  const onDeleteClick = (id) => {
    dispatch(deleteContact(id));
    navigate(`/dashboard`);
  };

  // Navigate to edit contact page
  const onEditClick = (id) => {
    navigate(`/dashboard/edit/${id}`);
  };

  return (
    <div>
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
          <h1>View Contact</h1>
          <br />

          {contactInfo.photo && (
            <div style={{ textAlign: "center" }}>
              <CloudinaryImg
                imgId={contactInfo.cloudinaryId}
                height={imgHeight}
                width={imgWidth}
              />
            </div>
          )}
          {!contactInfo.photo && (
            <div style={{ textAlign: "center" }}>
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.biiainsurance.com%2Fwp-content%2Fuploads%2F2015%2F05%2Fno-image.jpg&f=1&nofb=1"
                alt="chosen"
                style={{ height: "100px", borderRadius: "50%" }}
              />
            </div>
          )}
          {/* <Form onSubmit={onSubmit} noValidate validated={validated}> */}
          <Form.Group className="mb-3" controlId="formContactName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={contactInfo.name || ""}
              disabled="true"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactNum">
            <Form.Label>Numbers</Form.Label>
            {numbers.map((inputField, index) => (
              <InputGroup key={index}>
                <Row className="g-0 align-items-center">
                  <Col sm={4}>
                    <Form.Select
                      name="category"
                      defaultValue={inputField.category}
                      size="sm"
                      disabled="true"
                    >
                      <option value="Phone">Phone</option>
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                      <option value="Mobile">Mobile</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Control
                      type="numeric"
                      name="number"
                      value={inputField.number}
                      placeholder="Enter Number"
                      disabled="true"
                    />
                  </Col>
                </Row>
              </InputGroup>
            ))}
          </Form.Group>
          <Row>
            <Col>
              <Button onClick={() => onEditClick(contactInfo._id)}>
                <Edit />
                &nbsp; Edit
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger"
                onClick={() => onDeleteClick(contactInfo._id)}
              >
                <Trash color="white" />
                &nbsp; Delete
              </Button>
            </Col>
          </Row>
          {/* </Form> */}
        </Col>
      </Row>
    </div>
  );
};

export default ViewContact;
