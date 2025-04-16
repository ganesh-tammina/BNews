import React, { useState } from "react";
import Signup from '../pages/Signup';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {app, auth} from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const [submitted, setSubmitted] = useState({
    email:"",
    password:""
  });
 const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // let isvalid = true;
    // let validationErrors ={}
    // if(submitted.email === "" || submitted.email == null){
    //   isvalid = false;
    //   validationErrors.email = "email name is required"
    // }
    // else if(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(submitted.email)){
    //   isvalid = false;
    //   validationErrors.email = "Email is not Valid"
    // }
    // if(submitted.password === "" || submitted.password == null){
    //   isvalid = false;
    //   validationErrors.password = "password is required"
    // }
    // else if(submitted.password.length < 6){
    //   isvalid = false;
    //   validationErrors.password = "password length at least 6 char"
    // }
    // setErrors(validationErrors)
    // setValid(isvalid)
    //   axios.get("http://localhost:5500/posts",submitted).then(result =>{
    //     result.data.map(user =>{
    //       if(user.email === submitted.email && user.password === submitted.password){
    //             alert("login Successful")
    //             localStorage.setItem("users", JSON.stringify(user));
    //             navigate('Dashboard')
    //       }else {
    //         isvalid = false;
    //         validationErrors.password = "Wrong Password"
    //       }
    //     })
    //   }
    //   )
    //   .catch(err => console.log(err))
    signInWithEmailAndPassword(auth, submitted.email, submitted.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(userCredential)
    navigate('Dashboard')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    alert("user not found")

  });
  };
 
  return (
       <div className="login-page d-flex align-items-center justify-content-center">
        <Container>
        <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label>Email</label>
          <input type="email" className="form-control" name="email" onChange={(e)=>{setSubmitted({...submitted, email:e.target.value})}} placeholder="Email" />
          <span>{valid ? <></> : <span>{errors.email}</span>}</span>
        </div>
        <div className="form-group col-md-12">
          <label>Password</label>
          <input type="password" className="form-control" name="password" onChange={(e)=>{setSubmitted({...submitted, password:e.target.value})}} placeholder="Password" />
          <span>{valid ? <></> : <span>{errors.password}</span>}</span>
        </div>
      </div>
    
    
    
      
      <button type="submit"  className="btn btn-primary my-3">Login in</button>
    </form>
        </Container>
      </div>
  );
}
