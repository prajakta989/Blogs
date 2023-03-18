import React, { useContext, useRef } from "react";
import "./login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Context } from "../../Context/Context";
import axios from "axios";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context)

const handleSubmit = async(e)=> {
  e.preventDefault();
  dispatch({type:"LOGIN_START"});
  try{
    const res = await axios.post("/auth/login", {
      username:userRef.current.value,
      password: passwordRef.current.value
    });
    dispatch({type: "LOGIN_SUCCESS", payload: res.data})
  }
  catch(err){
    dispatch({type: "LOGIN_FAILURE"})
  }
  
}



  return (
    <div className="loginwrapper">
        <span className="head">Login</span>
      <Form className="loginform" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" ref={userRef} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
        </Form.Group>
        <Button variant="primary" type="submit" className="loginBtn" disabled={isFetching}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
