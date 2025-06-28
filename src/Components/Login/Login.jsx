import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import "./Login.css";
import loginimg from "../../assets/login.png";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg("Username is required.");
    } else if (!validatePassword(password)) {
      setErrorMsg(
        "Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 symbol."
      );
    } else {
      setErrorMsg("");
      navigate("/home");
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-white"
    >
      <Row className="w-100 login-container">
        <Col md={6} className="sign-left p-2 p-md-5">
          <div className="sign-left-container mx-auto mx-md-0">
            <h4 className="head-sign">Sign In</h4>
            <p className="new-user fw-bold pt-2">
              New user? <span className="create-link ms-2">Create an account</span>
            </p>

            <Form onSubmit={handleSubmit}>
              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

              <Form.Group controlId="username" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username or email"
                  className="input-box"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input-box"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Keep me signed in"
                className="my-4 fw-bold"
              />

              <Button type="submit" variant="dark" className="w-100 submit-btn mb-3">
                Sign In
              </Button>

              <div className="text-center my-4 text-muted or-line">
                <hr />
                <span className="or-text fw-bold">Or Sign In With</span>
              </div>

              <div className="social-icons d-flex justify-content-center gap-4 pt-2">
                <span className="social-circle">
                  <FaGoogle />
                </span>
                <span className="social-circle">
                  <FaFacebookF />
                </span>
                <span className="social-circle">
                  <FaLinkedinIn />
                </span>
                <span className="social-circle">
                  <FaTwitter />
                </span>
              </div>
            </Form>
          </div>
        </Col>

        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center p-2 p-md-5"
        >
          <img
            src={loginimg}
            alt="login-illustration"
            className="img-fluid login-img"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
