import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Write.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
// import Image from "../../assets/img2.jpg";
import { Context } from "../../Context/Context";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      username: user.username,
      userId: user._id
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="my-5">
      <Container>
        {/* <img src={Image} alt="img" className="uploadImage" /> */}
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="postImage"
            className="uploadImage"
          />
        )}
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="create">
              <h1 className="create">+</h1>
            </Form.Label>
            <Form.Control
              type="file"
              style={{ display: "none" }}
              id="create"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <FloatingLabel label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Write Description"
              onChange={(e) => setDesc(e.target.value)}
            />
          </FloatingLabel>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Write;
