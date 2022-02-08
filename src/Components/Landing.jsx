import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SignInForm from "./Auth/SignInForm";
import SignUpForm from "./Auth/SignUpForm";

function Landing() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);
  
  return (
    <div>
      <Container>
        <Row>
          <Col
            lg="6"
            className="d-flex align-items-center justify-content-center"
            // style={{ fontSize: "56px" }}
          >
            <h1 className="display-2">Contact Manager</h1>
          </Col>
          <Col lg="6">
            <SignUpForm />
            <br />
            <div className="text-center">
              <muted>Already Registered? </muted>
              <Link to="/login">Login Here</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Landing;
