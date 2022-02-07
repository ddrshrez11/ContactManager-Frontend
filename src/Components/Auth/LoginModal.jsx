import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavLink from "react-bootstrap/NavLink";
import Alert from "react-bootstrap/Alert";
import { login } from "../../Actions/authActions";
import { clearErrors } from "../../Actions/errorActions";
import { useDispatch, useSelector } from "react-redux";

export const LoginModal = () => {
  const [userInfo, setUserInfo] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [msg, setMsg] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
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

    const { email, password } = userInfo;

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  return (
    <div>
      <NavLink onClick={modalToggle} href="#">
        Login
      </NavLink>

      <Modal
        show={modalShow}
        onHide={modalToggle}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {msg ? <Alert variant="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
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
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginModal;
