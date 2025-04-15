import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSubmitted(false);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log("Form submitted", { email, password });
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="align-items-center">

          <Col md={6} className="text-center mb-4 mb-md-0">
            <img
              src="https://245e71ad27.imgdist.com/public/users/BeeFree/beefree-0f4385f8-5128-4571-8e6d-e5f83abb2362/News.jpg"
              alt="News vector"
              className="img-fluid animated-image spin-in"
            />
          </Col>
          <Col md={6}>
            <Card className="p-4 shadow rounded-4 animate__animated animate__fadeInRight custom-tabs">
            <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Sign In">
        <Login/>
      </Tab>
      <Tab eventKey="profile" title="Sign Up">
        <Signup/>
      </Tab>
    </Tabs>
            
              
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
