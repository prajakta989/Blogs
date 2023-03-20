import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Post = ({ posts }) => {
  const PF = "http://localhost:5000/images/";
  console.log("posts:" + posts);
  console.log(posts.photo);
  return (
    <div>
      <Card style={{ width: "18rem" }} className=" my-4">
        <Card.Img variant="top" src={posts.photo?PF + posts.photo: PF+"no-image.png"} />
        <Card.Body>
          <Link to={`/post/${posts._id}`}>
            <Card.Title>{posts.title}</Card.Title>
          </Link>

          <Card.Text>{posts.desc}</Card.Text>
          <span style={{ display: "block", marginBottom: "5px" }}>
            {new Date(posts.createdAt).toDateString()}
          </span>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;
