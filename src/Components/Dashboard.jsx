import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import ContactList from "./ContactList";
import Sidebar from "./Sidebar/Sidebar";
import SignIn from "./SignIn";

function Dashboard() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div>
      <Container>
        <Row>
          <Col lg="2">
            <Sidebar />
          </Col>
          <Col lg="10" md="12">
            <h1>Dashboard</h1>
            <Outlet />
          </Col>
        </Row>
      </Container>

      <Routes></Routes>
    </div>
  );
}

export default Dashboard;
