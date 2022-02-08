import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  return (
    <div>
      <div className="sidebar">
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link as={Link} to={"/"} href="">
            All Contacts
          </Nav.Link>
          <Nav.Link as={Link} to={"addContact"} href="">
            Add Contact
          </Nav.Link>
          <Nav.Link eventKey="link-1">Favourites</Nav.Link>
          <Nav.Link eventKey="link-2">Recent Called</Nav.Link>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
