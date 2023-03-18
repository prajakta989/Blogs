import React from "react";
import Container from "react-bootstrap/esm/Container";
import "./updateuser.css";
import Image from "../../assets/img2.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Updateuser = () => {
  return (
    <div className="updatewrapper my-4">
      <Container>
        <div className="top">
          <h3 className="updateHead">Update User Account</h3>
          <Button variant="outline-danger" type="submit">
            Delete
          </Button>
        </div>

        <img src={Image} alt="updatePic" className="updateprofile" />
        
        <label for="user">
          <span className="label">Change Profile</span>
        </label>
        <input type="file" id="user" style={{ display: "none" }} />
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Container>
    </div>
  );
};

export default Updateuser;
