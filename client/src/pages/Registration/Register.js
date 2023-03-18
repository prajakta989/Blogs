import React, { useState } from "react";
import "./register.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
const Register = () => {

  const[username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  console.log(username);
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      const res = await axios.post("/auth/register", {username, email,password});
      res.data && window.location.replace("/login");
    }
    catch(err){
      console.log(err);
      setError(true)
    }
    
  }
  return (
    <>
      <Button variant="outline-primary" className="loginButton">
        Login
      </Button>
      <div className="Registerwrapper">
        <span className="head">Sign In</span>
        <Form className="registerform" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" onChange={(e)=> {setUsername(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" onChange={(e)=> {setEmail(e.target.value)}}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}} />
          </Form.Group>
          <Button variant="primary" type="submit" className="loginBtn">
            Sign In
          </Button>
          {error && <span style={{color:"red"}}>Something went wrong</span>}
        </Form>
      </div>
    </>
  );
};

export default Register;
