import validation from 'ajv/dist/vocabularies/validation';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {app, auth,db} from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";


export default function Signup() {
    const [fomData, setFormData] = useState({
      fname :'',
      lname :'',
      email:'',
      address:"",
      password:'',  
      cpassword:'',  
    })

      useEffect(() => {
        fetchAllUsers();
      }, []);
    

    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);
    const navigate = useNavigate()

    const handleSubmits = (e) => {
      e.preventDefault();
    
      createUserWithEmailAndPassword(auth, fomData.email, fomData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: fomData.fname
          }).then(() => {
            // Store extra data in Firestore
            return setDoc(doc(db, "users", user.uid), {
              lname: fomData.lname,
              address:fomData.address
            });
          });
        })
        .then(() => {
          alert("User registered with full profile data!");
        })
        .catch((error) => {
          console.error("Error during signup:", error.code, error.message);
        });
    }


    const fetchAllUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = [];
        
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
    
        console.log("All users:", users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
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
    <div className="form-group col-md-12">
      <label>Address</label>
      <textarea className="form-control" name="cpassword" onChange={(e)=>{setFormData({...fomData, address:e.target.value})}} placeholder='Enter Address'></textarea >
      <span>{valid ? <></> : <span>{errors.address}</span>}</span>
    </div>
    
  </div>



  
  <button type="submit"  className="btn btn-primary my-3">Sign in</button>
</form>
    </Container>
  </div>

  
  


  )
}
