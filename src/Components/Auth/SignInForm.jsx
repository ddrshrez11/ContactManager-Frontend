import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { signin } from "../../Actions/authActions";
// import { clearErrors } from "../../Actions/errorActions";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../ActionButton";
import { useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const [userInfo, setUserInfo] = useState({});
  const [msg, setMsg] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error.id === "SIGNIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const onChange = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // send request on submit
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userInfo;
    const user = {
      email,
      password,
    };
    dispatch(signin(user));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Sign In</h1>
      <br />
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
        <ActionButton text="Sign In" />
      </Form>
    </div>
  );
};

export default SignInForm;
