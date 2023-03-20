import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Navbar from "react-bootstrap/Navbar";
// import Image from "../assets/img1.jpg";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";

const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handlelogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="topbar">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home" className="logo">
            Blog
          </Navbar.Brand>

          <Nav>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "20px",
              }}
            >
              Home
            </Link>

            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "20px",
              }}
            >
              About
            </Link>

            <Link
              to="/write"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "20px",
              }}
            >
              Write
            </Link>

            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "20px",
              }}
            >
              Contact
            </Link>

            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "20px",
              }}
              onClick={handlelogout}
            >
              {user ? "Logout" : ""}
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
          {user ? (
            <Link to="/update">
              <img alt="ProfilePic" src={PF+user.profilePic} className="img"></img>
            </Link>
          ) : (
            <Nav>
              <Nav.Link>
                <Link
                  to="/Register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Register
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login
                </Link>
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Topbar;
