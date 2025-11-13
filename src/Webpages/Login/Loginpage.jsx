import "./Loginpage.css";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");           // Store email input
  const [password, setPassword] = useState("");     // Store password input
  const [errors, setErrors] = useState({});          // Validation errors

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setErrors({});
  };
  const handleShow = () => setShow(true);

  // Simple email regex
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Invalid email address";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    // If no errors, proceed
    if (Object.keys(validationErrors).length === 0) {
      // Simulate login success
      handleClose();
      navigate("/home");
    }
  };

  return (
    <div>
      <div className="login-page w-100 vh-100">
        <img className="login-logo w-15" src="/images/logo.png" alt="" />
        <h2 className="text-white fs-1 fw-light mt-5">
          Unlimited streaming of
        </h2>
        <h2 className="heading2 text-blue fs-50 fw-bold my-2">
          movies, series, and more.
        </h2>
        <h2 className="heading3 text-white fs-4 fw-light mb-5">
          All your favourites in one place. Start Watching now
        </h2>

        <div>
          <button
            type="button"
            className="px-5 py-2 rounded-pill mt-3 text-white fw-bold fs-5 bg-blue w-100 border-0"
            onClick={handleShow}
          >
            LOGIN
          </button>

          <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
            contentClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title className="w-100 text-center fs-50 fw-bold">
                LOGIN
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-5 w-70">
              <Form noValidate onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    isInvalid={!!errors.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    isInvalid={!!errors.password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
