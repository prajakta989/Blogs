import React, { useContext, useEffect, useState } from "react";
import "./SinglePost.css";
import Image from "../assets/img2.jpg";
import Button from "react-bootstrap/esm/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../Context/Context";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatemode, setUpdatemode] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      console.log(res.data);
    };
    getPost();
  }, [path]);

  console.log(user);
  return (
    <div className="post">
      {post.photo ? (
        <img src={PF + post.photo} alt="post" className="image" />
      ) : (
        <img src={Image} alt="post" className="image" />
      )}
      {updatemode ? (
        <input type="text" value={post.title} />
      ) : (
        <h1 className="title py-2">{post.title}</h1>
      )}
      {updatemode ? <textarea /> : <p className="desc py-2">{post.desc}</p>}

      {post.username === user?.username && (
        <div className="btns">
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={() => setUpdatemode(true)}
          >
            Update
          </Button>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
