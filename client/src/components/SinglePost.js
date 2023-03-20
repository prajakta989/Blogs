import React, { useContext, useEffect, useState } from "react";
import "./SinglePost.css";
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

  const handleUpdate =async()=> {
    try{
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc
      });
      setUpdatemode(false)
    }
    catch(err){
      
    }
  }

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      console.log(res.data);
    };
    getPost();
  }, [path]);

  console.log(user);
  console.log(post.username);
  return (
    <div className="post">
      {post.photo ? (
        <img src={PF + post.photo} alt="post" className="image" />
      ) : (
        ""
      )}
      {updatemode ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h1 className="title py-2">{title}</h1>
      )}
      {updatemode ? (
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
      ) : (
        <p className="desc py-2">{desc}</p>
      )}

      {post.username === user?.username && updatemode === false && (
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
      {updatemode && (
        <div>
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
