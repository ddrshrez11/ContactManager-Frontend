import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

import SignOut from "./Auth/SignOut";

import { useSelector } from "react-redux";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AppNavbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const authLinks = (
    <Fragment>
      <Navbar.Text>
        <strong></strong>
      </Navbar.Text>
      <NavDropdown title={user ? user.name : ""} id="basic-nav-dropdown">
        {/* <NavDropdown.Item href="#">View Profile</NavDropdown.Item> */}
        <NavDropdown.Divider />
        <SignOut />
      </NavDropdown>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavLink as={Link} to={"/"} href="#">
        SignUp
      </NavLink>
      <NavLink as={Link} to={"/login"} href="#">
        Sign In
      </NavLink>
    </Fragment>
  );

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Contacts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            {/* <Form className="d-flex ms-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            <Nav className="ms-auto">
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Navbar.Collapse>
          {/* <Button variant="primary">Primary</Button> */}
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
