import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addContact, editContact } from "../Actions/contactActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ActionButton from "./ActionButton";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ContactList from "./ContactList";

export const ContactForm = (props) => {
  const [contactInfo, setContactInfo] = useState({});
  // const [previewSource, setPreviewSource] = useState("");
  const error = useSelector((state) => state.error);
  const { contacts } = useSelector((state) => state.contact);
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

  // const onFileChange = (e) => {
  //   const file = e.target.files[0];
  //   previewFile(file);
  //   console.log(file);
  //   setContactInfo((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: file.name,
  //   }));
  // };

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //     return reader.result;
  //   };
  // };

  const onChange = (e) => {
    setContactInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (previewSource) uploadImage(previewSource);
    if (props.type === "add") {
      const newContact = {
        name: contactInfo.name,
        number: contactInfo.number,
      };
      console.log(contactInfo);
      // Add Item Action
      dispatch(addContact(newContact));
    } else if (props.type === "edit") {
      console.log("edit");
      const editedContact = {
        name: contactInfo.name,
        number: contactInfo.number,
      };
      dispatch(editContact(params.id, editedContact));
    }

    navigate("/dashboard");
  };

  // const uploadImage = async (base64EncodedImage) => {
  //   console.log(base64EncodedImage);
  //   try {
  //     await fetch("/api/upload", {
  //       method: "POST",
  //       body: JSON.stringify({ data: base64EncodedImage }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     // setFileInputState('');
  //     // setPreviewSource('');
  //     // setSuccessMsg('Image uploaded successfully');
  //   } catch (err) {
  //     console.error(err);
  //     // setErrMsg('Something went wrong!');
  //   }
  // };
  return (
    <div>
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
          <h1>{props.text}</h1>
          <br />
          {/* {previewSource && (
            <div style={{ textAlign: "center" }}>
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "100px" }}
              />
            </div>
          )} */}
          <Form onSubmit={onSubmit}>
            {/* <Form.Group className="mb-3" controlId="formContactPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                // value={contactInfo.photo || ""}
                placeholder="Upload Picture"
                onChange={onFileChange}
              />
            </Form.Group> */}
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
