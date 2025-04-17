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
import { database } from '../firebase';
import firebaseLogout from "../componets/Logout";
import { ref, onValue } from 'firebase/database';
import { setCategories } from '../Redux/CatSlice';
// import Weather from '../componets/weather';
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
  const [comments, setComments] = useState([]);
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


    const categoriesRef = ref(database, 'catagerious');
    const unsubscribes = onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Array.isArray(data) ? data : Object.values(data);
        const catList = formatted.map(item => item.catagerious);
        setComments(catList);
        dispatch(setCategories(catList));
        console.log("🔄 Real-time data updated:", catList);
      } else {
        setComments([]);
      }
    });
    return () => unsubscribes();

  }, [dispatch]);
  const handleLogin = (mydata) => {
    axios.post("https://bnews-4833f-default-rtdb.firebaseio.com/catagerious.json", mydata)
    // You could send this to an API or process it further
  };

  const getNews = (ress) => {
    axios.post("https://bnews-4833f-default-rtdb.firebaseio.com/news.json", ress).then(res =>{
      alert("add items")
    })
  };
  
  
  // const filteredData = mydatas.mydata.filter(item =>
  //   item.catagerious.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // console.log(typeof(filteredData))
  // if(filteredData.length <= 0){
  //   var text = "no catageory is found"
  // }

  const handleClick = (item) => {
    console.log('Clicked item:', item.id);
    navigate(`/CatageriousPage/${item.title}`, { state: { item } });
    // Trigger any logic you want here
  };



  console.log(mydatas)
  console.log(data)
  console.log(searchQuery)
  // console.log(fullUser)


 
  return (
    <div>
    <Navbar/>
    <div class="container mt-3">
      <div class="row">
          <div class="col-6">
          {currentUser ? (
        <div>
          {/* <p><strong>Username:</strong> {userData.username}</p> */}
          <h2>Wellcome {currentUser.displayName}</h2>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
          </div>
          <div class="col-6 text-end d-flex justify-content-end">
          {/* <button type="button" class="btn btn-primary">ADD catageory</button> */}
          <CreateCategerios mylogin={handleLogin}/>
          <CrateNews sendNews={getNews}/>
          </div>

      </div>
      <div class="row">
        
      <div>
        {comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        <div class="mt-5">
          {comments.map((item, index) => (
            <div class="card das-card" onClick={() => handleClick(item)} key={index} style={{ marginBottom: '10px' }}>
               {item.title} 
            </div>
          ))}
        </div>
      )}
      </div>
      </div>
    </div>

    </div>

  )
}
