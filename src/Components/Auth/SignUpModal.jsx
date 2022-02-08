import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavLink from "react-bootstrap/NavLink";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Actions/authActions";
import { clearErrors } from "../../Actions/errorActions";
import ActionButton from "../ActionButton";

export const SignUpModal = () => {
  const [userInfo, setUserInfo] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [msg, setMsg] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error.id === "SIGNUP_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      if (modalShow) {
        modalToggle();
      }
    }
  }, [isAuthenticated]);

  const onChange = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const modalToggle = () => {
    dispatch(clearErrors());
    setModalShow((prevState) => !prevState);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = userInfo;

    const newUser = {
      name,
      email,
      password,
    };
    dispatch(signup(newUser));

    // //close Model
    // modalToggle();
  };

  return (
    <div>
      <NavLink onClick={modalToggle} href="#">
        SignUp
      </NavLink>

      <Modal
        show={modalShow}
        onHide={modalToggle}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {msg ? <Alert variant="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUserPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
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
            <ActionButton text="Sign Up" />
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignUpModal;
