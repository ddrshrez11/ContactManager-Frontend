import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavLink from "react-bootstrap/NavLink";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { register } from "../../Actions/authActions";
import { clearErrors } from "../../Actions/errorActions";
import PropTypes from "prop-types";

export const RegisterModal = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [msg, setMsg] = useState(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    const { error, isAuthenticated } = props;
    if (error.id === "REGISTER_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    if (modalShow) {
      if (isAuthenticated) {
        modalToggle();
      }
    }
  }, [props]);

  const onChange = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(userInfo);
  };

  const modalToggle = () => {
    props.clearErrors();
    setModalShow((prevState) => !prevState);
  };

  const onSubmit = (e) => {
    console.log("here");
    e.preventDefault();

    const { name, email, password } = userInfo;

    const newUser = {
      name,
      email,
      password,
    };
    props.register(newUser);

    // //close Model
    // modalToggle();
  };

  return (
    <div>
      <NavLink onClick={modalToggle} href="#">
        Register
      </NavLink>

      <Modal
        show={modalShow}
        onHide={modalToggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
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
            <Button variant="primary" type="submit">
              Register
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

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

const mapDispatchToProps = { register, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
