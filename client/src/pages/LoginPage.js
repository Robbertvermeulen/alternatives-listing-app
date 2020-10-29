import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginPage = (props) => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form>
            <h1>Login</h1>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Button block>Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
