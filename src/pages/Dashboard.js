import React, { useEffect, useState, createContext } from 'react';
import Navbar from '../componets/NavbarLayout';
import CreateCategerios from '../componets/CreateCategerios'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo } from '../Redux/Slicer';
import { catTodo } from '../Redux/CatSlice';
import {itemTodo} from '../Redux/eachItems';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import CrateNews from '../componets/CreateNews';
import { auth, db } from "../firebase";
import firebaseLogout from "../componets/Logout";
// import { logout } from "../componets/NavbarLayout"

export const UserContext = createContext();

export default function Dashboard() {
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("users"));
  const obj = { messages: [] };
  const dispatch = useDispatch()
  const [pednding, Setpending] = useState(false)
  const data = useSelector(state => state.bookName)
  const mydatas = useSelector(state => state.catName)
  const mydatass = useSelector(state => state.itemName)

  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const firestoreData = docSnap.data();

            // Merge Auth data + Firestore data
            const fullUser = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              ...firestoreData
            };
            setCurrentUser(fullUser);
            console.log("Merged user object:", fullUser);
            const b = obj.push(fullUser)
            console.log(b);

          } else {
            console.log("No Firestore data found for user.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No user logged in.");
      }
    });

    // return () => unsubscribe();
  }, []);
  const handleLogin = (mydata) => {
    axios.post("http://localhost:5500/comments", mydata).then(res => 
      alert("added succefulyy"),
      window.location.reload()
    )

    // You could send this to an API or process it further
  };

  const getNews = (ress) => {
    axios.post("http://localhost:5500/items", ress).then(res =>{
      alert("add items")
      window.location.reload()
    })
  };
  
  
  const filteredData = mydatas.mydata.filter(item =>
    item.catagerious.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(typeof(filteredData))
  if(filteredData.length <= 0){
    var text = "no catageory is found"
  }

  const handleClick = (item) => {
    console.log('Clicked item:', item.id);
    navigate(`/CatageriousPage/${item.catagerious.title}`, { state: { item } });
    // Trigger any logic you want here
  };
  useEffect(()=>{
    dispatch(fetchTodo())
    dispatch(catTodo())

  },[])

  console.log(mydatas)
  console.log(data)
  console.log(searchQuery)
  // console.log(fullUser)
  const handleLogout = () => {
    firebaseLogout(
      () => {
        alert("Logged out!");
        navigate("/welcome"); 
      },
      (error) => {
        alert("Logout failed!");
      }
    );
  };

 
  return (
    <div>
    {/* <Navbar/> */}
    {currentUser ? (
        <div>
          {/* <p><strong>Username:</strong> {userData.username}</p> */}
          <h2>Wellcome {currentUser.displayName}</h2>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <div>
      <button onClick={handleLogout}>Logout</button>
      </div>
    </div>

  )
}
