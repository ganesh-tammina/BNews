import validation from 'ajv/dist/vocabularies/validation';
import React, {useState} from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {app, auth} from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function Signup() {
    const [fomData, setFormData] = useState({
      fname :'',
      lname :'',
      email:'',
      password:'',  
      cpassword:'',  
    })

    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);
    const navigate = useNavigate()

    const handleSubmits = (e)=>{
      e.preventDefault();
      createUserWithEmailAndPassword(auth, fomData.email, fomData.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("User added Successfuly")
    window.location.reload()
    console.log(userCredential)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)

    // ..
  });
      // let isvalid = true;
      // let validationErrors={}
      // if(fomData.fname === "" || fomData.fname == null){
      //   isvalid = false;
      //   validationErrors.fname = "First name is required"
      // }
      // if(fomData.lname === "" || fomData.lname == null){
      //   isvalid = false;
      //   validationErrors.lname = "Last name is required"
      // }
      // if(fomData.email === "" || fomData.email == null){
      //   isvalid = false;
      //   validationErrors.email = "email name is required"
      // }
      // else if(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(fomData.email)){
      //   isvalid = false;
      //   validationErrors.email = "Email is not Valid"
      // }
      // if(fomData.password === "" || fomData.password == null){
      //   isvalid = false;
      //   validationErrors.password = "password is required"
      // }
      // else if(fomData.password.length < 6){
      //   isvalid = false;
      //   validationErrors.password = "password length at least 6 char"
      // }
      // if(fomData.cpassword !== fomData.password){
      //   isvalid = false;
      //   validationErrors.cpassword = "confirm password is not matched"
      // }

      // setErrors(validationErrors)
      // setValid(isvalid)
      // if(Object.keys(validationErrors).length == 0){
      //   axios.post("http://localhost:5500/posts",fomData).then(result =>
      //     alert("Register Successfully"),
      //     window.location.reload()
      //   )
      //   .catch(err => console.log(err))
      // }

    }

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
    <Container>
    <form onSubmit={handleSubmits}>
  <div className="form-row">
  <div className="form-group">
    <label>First Name</label>
    <input type="text" className="form-control" name="fname" onChange={(e)=>setFormData({...fomData, fname: e.target.value})} placeholder="First Name" />
    <span>{valid ? <></> : <span>{errors.fname}</span>}</span>
  </div>
  <div className="form-group">
    <label>Last Name</label>
    <input type="text" className="form-control" name="lname" onChange={(e)=>{setFormData({...fomData, lname:e.target.value})}} placeholder="Last Name" />
    <span>{valid ? <></> : <span>{errors.lname}</span>}</span>
  </div>
    <div className="form-group col-md-12">
      <label>Email</label>
      <input type="email" className="form-control" name="email" onChange={(e)=>{setFormData({...fomData, email:e.target.value})}} placeholder="Email" />
      <span>{valid ? <></> : <span>{errors.email}</span>}</span>
    </div>
    <div className="form-group col-md-12">
      <label>Password</label>
      <input type="password" className="form-control" name="password" onChange={(e)=>{setFormData({...fomData, password:e.target.value})}} placeholder="Password" />
      <span>{valid ? <></> : <span>{errors.password}</span>}</span>
    </div>
    <div className="form-group col-md-12">
      <label>Confirm Password</label>
      <input type="password" className="form-control" name="cpassword" onChange={(e)=>{setFormData({...fomData, cpassword:e.target.value})}} placeholder="Password" />
      <span>{valid ? <></> : <span>{errors.cpassword}</span>}</span>
    </div>
  </div>



  
  <button type="submit"  className="btn btn-primary my-3">Sign in</button>
</form>
    </Container>
  </div>

  
  


  )
}
