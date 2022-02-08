import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {
  addContact,
  editContact,
  uploadImage,
} from "../Actions/contactActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ActionButton from "./ActionButton";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ContactList from "./ContactList";

export const ContactForm = (props) => {
  const [contactInfo, setContactInfo] = useState({});
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const error = useSelector((state) => state.error);
  const { contacts } = useSelector((state) => state.contact);
  const image = useSelector((state) => state.contact.image);
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (props.type === "edit") {
      // console.log(contacts);
      const editContact = contacts.find((contact) => contact._id === params.id);
      console.log(editContact);
      setContactInfo({ ...editContact });
    }
  }, []);
  useEffect(() => {
    if (selectedFile !== "") {
      previewFile(selectedFile);
      console.log(selectedFile);
    }
  }, [selectedFile]);

  const onFileChange = (e) => {
    dispatch(uploadImage(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      return reader.result;
    };
  };

  const onChange = (e) => {
    setContactInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (props.type === "add") {
      console.log(image);
      const newContact = {
        name: contactInfo.name,
        number: contactInfo.number,
        userId: userId,
        photo: image.photo,
        cloudinaryId: image.cloudinaryId,
      };
      console.log(newContact);
      // Add Item Action
      dispatch(addContact(newContact));
    } else if (props.type === "edit") {
      console.log("edit");
      const editedContact = {
        name: contactInfo.name,
        number: contactInfo.number,
      };
      if (contactInfo.photo) {
        editedContact.photo = contactInfo.photo;
        editedContact.cloudinaryId = contactInfo.cloudinaryId;
      }
      dispatch(editContact(params.id, editedContact));
    }

    navigate("/dashboard");
  };

  return (
    <div>
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
          <h1>{props.text}</h1>
          <br />
          {previewSource && (
            <div style={{ textAlign: "center" }}>
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "100px" }}
              />
            </div>
          )}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formContactPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                // value={contactInfo.photo || ""}
                placeholder="Upload Picture"
                onChange={onFileChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContactName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={contactInfo.name || ""}
                placeholder="Enter Name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContactNum">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="numeric"
                name="number"
                value={contactInfo.number || ""}
                placeholder="Enter Number"
                onChange={onChange}
              />
            </Form.Group>
            <ActionButton text={props.text} />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ContactForm;
