import PropTypes from "prop-types";
import React, { Fragment } from "react";
import NavLink from "react-bootstrap/NavLink";
import { useDispatch } from "react-redux";
import { logout } from "../../Actions/authActions";
export const Logout = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };
  return (
    <Fragment>
      <NavLink onClick={handleClick} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
