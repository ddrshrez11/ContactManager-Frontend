import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

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
          <Col sm="3">
            <Sidebar />
          </Col>
          <Col sm="9">
            <h1>Dashboard</h1>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
