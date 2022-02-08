import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SignInForm from "./Auth/SignInForm";

function SignIn() {
  return (
    <div>
      <Container>
        <Row style={{ height: "100%" }}>
          <Col lg={{ span: 4, offset: 4 }}>
            <br />
            <br />
            <SignInForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignIn;
