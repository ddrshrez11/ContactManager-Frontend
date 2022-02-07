import PropTypes from "prop-types";
import React, { Fragment } from "react";
import NavLink from "react-bootstrap/NavLink";
import { connect } from "react-redux";
import { logout } from "../../Actions/authActions";
export const Logout = (props) => {
  return (
    <Fragment>
      <NavLink onClick={props.logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
