import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../images/logo.png";
import { Button } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";

function Navigation() {
    const { user } = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    function handleLogout() {
        logoutUser().then(({ error }) => {
            if (!error) {
                console.log("logged out!");
            }
        });
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand href="#home">
                        <img src={logo} style={{ width: 60 }} alt="logo" />
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/login">
                            <Nav.Link className="btn btn-primary text-white">
                                Login
                            </Nav.Link>
                        </LinkContainer>

                        {user && (
                            <NavDropdown
                                title={user.email}
                                id="basic-nav-dropdown"
                            >
                                <LinkContainer to="/new-article">
                                    <NavDropdown.Item>
                                        New Article
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/articles/me">
                                    <NavDropdown.Item>
                                        My Articles
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Button
                                        onClick={handleLogout}
                                        variant="outline-danger"
                                    >
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
