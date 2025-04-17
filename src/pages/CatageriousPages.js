import React, {useEffect, useState} from 'react'
import Navbar from '../componets/NavbarLayout'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateNews from '../componets/CreateNews'
import { eachItem } from '../Redux/eachItems';
import { ref, onValue } from 'firebase/database';
import { setCategories } from '../Redux/CatSlice';
import { database } from '../firebase';


export default function CatageriousPages() {
    const dispatch = useDispatch()
  const mydatas = useSelector(state => state.itemName)
const { id } = useParams();
const { state } = useLocation();
  const [comments, setComments] = useState([]);


const item = state?.item;
  useEffect(()=>{
    const categoriesRef = ref(database, 'news');
    const unsubscribes = onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Array.isArray(data) ? data : Object.values(data);
        const catList = formatted.map(item => item.news);
        setComments(catList);
        console.log("🔄 Real-time data updated:", catList);
      } else {
        setComments([]);
      }
    });
    return () => unsubscribes();
  },[])




  return (
    <div>
      <Navbar/>
    <div class="container my-3">
    <div class="row">
        <div class="col-6">
        <h2 class="h-class">{item.title}</h2> 
        </div>
    
        <div class="col-6 text-end">
        {/* <CreateCategerios mylogin={handleLogin}/> */}
        </div>
      </div>
      <div>
      </div>
   
        <div class="mt-5">
          {comments.map((res, index) => {
            if(item.title == res.item){
              return <div class="card das-card me-2"  key={index} style={{ marginBottom: '10px' }}>
              {res.title} 
              <div>
               {res.content}
              </div>
           </div>
            }
          
})}
        </div>
      </div>
      </div>
  )
}
