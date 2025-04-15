import React, { useEffect, useState } from 'react';
import Navbar from '../componets/NavbarLayout';
import CreateCategerios from '../componets/CreateCategerios'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo } from '../Redux/Slicer';
import { catTodo } from '../Redux/CatSlice';
import {itemTodo} from '../Redux/eachItems';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CrateNews from '../componets/CreateNews'


export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("users"));
  const obj = { messages: [] };
  obj.messages.push(user);
  console.log(obj.messages[0].fname)
  const dispatch = useDispatch()
  const [pednding, Setpending] = useState(false)
  const data = useSelector(state => state.bookName)
  const mydatas = useSelector(state => state.catName)
  const mydatass = useSelector(state => state.itemName)

  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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


 
  return (
    
    <div >
      <Navbar/>
      <div class=" my-3 me-4">
      <div class="container">
  <div class="row">
    <div class="col-6">
    <h2 class="h-class">Wellcome {obj.messages[0].fname}</h2> 
    </div>

    <div class="col-6 text-end d-flex justify-content-end">
    <CreateCategerios mylogin={handleLogin}/>
    <CrateNews sendNews={getNews}/>
    </div>
  </div>
  <div class="row">
    
  <div class="mt-3">
          <div>
   
          <div class="text-center mb-4">
          <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-50 mb-3 p-2 border rounded-md"
      />
          </div>
          </div>
       

        {
          mydatas.isLoading ? <div>
        <div class="loader"></div>
          </div> : <div class="d-flex" >
            {filteredData.map((res,index)=>{
              return <div key={index} onClick={() => handleClick(res)} class="text-center ms-4 card m-1 p-2 das-card" >
                {res.catagerious.title}
                </div>
            })}
      
          </div>
        
        }
        {
          <div class="text-center no-data">
           {text}
        </div>
        }
       </div>
  </div>
</div>
  

       <div>
        {/* {
          data.isLoading ? <div>
        <div class="loader"></div>
          </div> : <div >
            {data.data.map((res)=>{
              return <p class="ms-4">{res.fname}</p>
            })}
          </div>
    
        } */}
       </div>

       <div>
       <div >

</div>
       </div>
      </div>
    </div>
  )
}
