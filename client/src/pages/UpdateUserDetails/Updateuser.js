import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import "./updateuser.css";
// import Image from "../../assets/img2.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Context } from "../../Context/Context";
import axios from "axios";

const Updateuser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(false);
  const { user , dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res= await axios.put("/user/" + user._id, updatedUser);
      dispatch({type:"UPDATE_SUCCESS", payload:res.data});
      setMsg(true)
    } catch (err) {
      dispatch({type:"UPDATE_FAILURE"})
    }
  };

  return (
    <div className="updatewrapper my-4">
      <Container>
        <div className="top">
          <h3 className="updateHead">Update User Account</h3>
          <Button variant="outline-danger" type="submit">
            Delete
          </Button>
        </div>

        <img
          src={file ? URL.createObjectURL(file) : PF+user.profilePic}
          alt="updatePic"
          className="updateprofile"
        />

        <label htmlFor="user">
          <span className="label">Change Profile</span>
        </label>
        <input
          type="file"
          id="user"
          name="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleUpdate}>
          Update
        </Button>
        {msg? <p>Updated profile successfully</p>: " "}
      </Container>
    </div>
  );
};

export default Updateuser;
