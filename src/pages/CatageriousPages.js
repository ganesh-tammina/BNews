import React, {useEffect} from 'react'
import Navbar from '../componets/NavbarLayout'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateNews from '../componets/CreateNews'
import { eachItem } from '../Redux/eachItems';

export default function CatageriousPages() {
    const dispatch = useDispatch()
  const mydatas = useSelector(state => state.itemName)
const { id } = useParams();
const { state } = useLocation();

const item = state?.item;
  useEffect(()=>{
    dispatch(eachItem())
  },[])




  return (
    <div>
      {/* <Navbar/> */}
    <div class="container my-3">
    <div class="row">
        <div class="col-6">
        <h2 class="h-class">{item.catagerious.title}</h2> 
        </div>
    
        <div class="col-6 text-end">
        {/* <CreateCategerios mylogin={handleLogin}/> */}
        </div>
      </div>
      <div>
      </div>
      {
 mydatas.itemdata.map((res)=>{
  if(res.news.item == item.catagerious.title){
    return <div class="my-3 card p-3">
      <div>
      <h4>{res.news.title}</h4>
        </div>
      <div class="">
      {res.news.content}
        </div>
      </div>
  }

})
      }
      {/* {
        <div>
          <h6>No data</h6>
        </div>
      } */}
      </div>
      </div>
  )
}
