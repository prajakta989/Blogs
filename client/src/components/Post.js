import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "../assets/img1.jpg";
import { Link } from "react-router-dom";

const Post = ({ posts }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }} className=" my-4">
        <Card.Img variant="top" src={Image} />
        <Card.Body>
          <Link to={`/post/${posts._id}`}>
            <Card.Title>{posts.title}</Card.Title>
          </Link>

          <Card.Text>{posts.desc}</Card.Text>
          <span style={{ display: "block", marginBottom: "5px" }}>
            {new Date(posts.createdAt).toDateString()}
          </span>
          <Button variant="secondary" className="me-2">
            Update
          </Button>
          <Button variant="danger" className="me-2">
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;
