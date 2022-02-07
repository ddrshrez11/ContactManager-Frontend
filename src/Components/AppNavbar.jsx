import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import RegisterModal from "./Auth/RegisterModal";
import LoginModal from "./Auth/LoginModal";
import Logout from "./Auth/Logout";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export const AppNavbar = (props) => {
  const { isAuthenticated, user } = props.auth;

  const authLinks = (
    <Fragment>
      <Navbar.Text>
        <strong>{user ? `Hello! ${user.name}` : ""}</strong>
      </Navbar.Text>
      <Logout />
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <RegisterModal />
      <LoginModal />
    </Fragment>
  );

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Contacts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Form className="d-flex ms-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav className="ms-auto">
              {isAuthenticated ? authLinks : guestLinks}
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          {/* <Button variant="primary">Primary</Button> */}
        </Container>
      </Navbar>
      <br />
    </div>
  );
};

AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
