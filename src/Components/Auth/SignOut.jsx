import React, { Fragment } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../../Actions/authActions";
export const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //perform signout and redirect to landing page
  const handleClick = () => {
    dispatch(signout());
    navigate("/");
  };
  return (
    <Fragment>
      <NavDropdown.Item onClick={handleClick} href="#">
        SignOut
      </NavDropdown.Item>
    </Fragment>
  );
};

export default SignOut;
