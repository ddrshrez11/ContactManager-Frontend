import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { loadUser } from "../Actions/authActions";
import Sidebar from "./Sidebar/Sidebar";

function Dashboard() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div>
      <Container
        style={{
          backgroundColor: "rgb(249, 251, 253)",
          height: "90vh",
          color: "black",
        }}
      >
        <Row>
          <Col sm="3">
            <Sidebar />
          </Col>
          <Col sm="9">
            {/* <h1>Dashboard</h1> */}
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
