import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useSignupUserMutation } from "../services/appApi";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupUser, { data, isLoading, isError, error }] =
        useSignupUserMutation();
    const navigate = useNavigate();
    function handleSignup(e) {
        e.preventDefault();
        signupUser({ email, password }).then(({ error }) => {
            if (!error) {
                navigate("/");
            }
        });
    }
    if (data) {
        console.log(data);
    }
    return (
        <Container>
            <Row>
                <Col
                    md={7}
                    className="d-flex align-items-center justify-content-center"
                >
                    <Form className="signup__form" onSubmit={handleSignup}>
                        <h1 className="text-center">Create account</h1>
                        {isError && (
                            <p className="alert alert-danger text-center">
                                {error.data}
                            </p>
                        )}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                        <div className="py-4">
                            <span className="text-center">
                                Already have an account?{" "}
                                <Link to="/login">Login</Link>
                            </span>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg--container"></Col>
            </Row>
        </Container>
    );
}

export default Signup;
