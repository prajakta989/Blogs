import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Post from "../components/Post";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts");
      console.log(res);
      setPosts(res.data);
    };

    fetchPost();
  }, []);
  return (
    <Container>
      <div className="py-4 home">
        {posts.map((p) => {
          return <Post key={p._id} posts={p} />;
        })}
      </div>
    </Container>
  );
};

export default Home;
