import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  addContact,
  editContact,
  uploadImage,
} from "../Actions/contactActions";
import { useSelector, useDispatch } from "react-redux";
import ActionButton from "./ActionButton";
import { ButtonGroup, Col, InputGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CloudinaryImg from "./CloudinaryImg";

export const ContactForm = (props) => {
  const [contactInfo, setContactInfo] = useState({});
  const [numbers, setNumbers] = useState([{ category: "Phone", number: "" }]);
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [validated, setValidated] = useState(false);
  // const error = useSelector((state) => state.error);
  const { contacts } = useSelector((state) => state.contact);
  const image = useSelector((state) => state.contact.image);
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const imgHeight = 100;
  const imgWidth = 100;

  useEffect(() => {
    if (props.type === "edit") {
      // console.log(contacts);
      const dispContact = contacts.find((contact) => contact._id === params.id);
      console.log(dispContact);
      setContactInfo({ ...dispContact });
      setNumbers([...dispContact.numbers]);
    }
  }, []);

  useEffect(() => {
    if (selectedFile !== "") {
      previewFile(selectedFile);
      console.log(selectedFile);
    }
  }, [selectedFile]);

  const onFileChange = (e) => {
    if (e.target.files[0]) {
      dispatch(uploadImage(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    }
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

  const handleNumChange = (e, index) => {
    const values = [...numbers];
    values[index][e.target.name] = e.target.value;
    setNumbers(values);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setValidated(true);
      if (props.type === "add") {
        console.log(image);
        const newContact = {
          name: contactInfo.name,
          numbers: numbers,
          userId: userId,
          favourite: contactInfo.favourite,
        };
        if (image) {
          newContact.photo = image.photo;
          newContact.cloudinaryId = image.cloudinaryId;
        }
        console.log(newContact);
        // Add Item Action
        dispatch(addContact(newContact));
      } else if (props.type === "edit") {
        console.log("edit");
        const editedContact = {
          name: contactInfo.name,
          numbers: numbers,
        };
        if (contactInfo.photo) {
          editedContact.photo = contactInfo.photo;
          editedContact.cloudinaryId = contactInfo.cloudinaryId;
        }
        dispatch(editContact(params.id, editedContact));
      }

      navigate("/dashboard");
    }
  };

  const handleAddField = () => {
    setNumbers((prevState) => [
      ...prevState,
      { category: "Phone", number: "" },
    ]);
  };
  const handleRemoveField = (index) => {
    const values = [...numbers];
    if (values.length > 1) {
      values.splice(index, 1);
      setNumbers(values);
    }
  };

  return (
    <div>
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
          <h1>{props.text}</h1>
          <br />
          {!previewSource && contactInfo.photo && (
            <div style={{ textAlign: "center" }}>
              <CloudinaryImg
                imgId={contactInfo.cloudinaryId}
                height={imgHeight}
                width={imgWidth}
              />
            </div>
          )}
          {!previewSource && !contactInfo.photo && (
            <div style={{ textAlign: "center" }}>
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.biiainsurance.com%2Fwp-content%2Fuploads%2F2015%2F05%2Fno-image.jpg&f=1&nofb=1"
                alt="chosen"
                style={{ height: "100px", borderRadius: "50%" }}
              />
            </div>
          )}
          {previewSource && (
            <div style={{ textAlign: "center" }}>
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "100px" }}
              />
            </div>
          )}

          <Form onSubmit={onSubmit} noValidate validated={validated}>
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
                required
                value={contactInfo.name || ""}
                placeholder="Enter Name"
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Looks good!
              </Form.Control.Feedback>
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
                        onChange={(e) => handleNumChange(e, index)}
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
                        onChange={(e) => handleNumChange(e, index)}
                      />
                    </Col>
                    <Col sm={1}>
                      <ButtonGroup>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={handleAddField}
                        >
                          <strong>+</strong>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveField(index)}
                        >
                          <strong>-</strong>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </InputGroup>
              ))}
            </Form.Group>
            <ActionButton text={props.text} />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ContactForm;
