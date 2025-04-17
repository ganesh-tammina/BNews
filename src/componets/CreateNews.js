import React,{useState}  from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { catTodo } from '../Redux/CatSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function CreateCategerios({sendNews}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const createNews = () => setShow(true);
    const mydatas = useSelector(state => state.catName)
    const categories = useSelector((state) => state.category.list);
  // console.log(categories)


    const [news, Setnews] = useState({
        title:"",
        content:"",
        item:""
    })

 

 

      const  handleNews = (e) => {
        e.preventDefault()
        const mydata = {news}
        sendNews(mydata)
    
        // You could send this to an API or process it further
      };



    

 
  return (
    <div>
      <Button variant="primary" class="btn btn-primary ms-2" onClick={createNews}>
        Create News
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleNews}>
  <div className="form-row">
  <div className="form-group">
    <label>Title</label>
    <input type="text" className="form-control"  onChange={(e)=> Setnews({...news, title:e.target.value})} placeholder="Last Name" />
  </div>
  <div className="form-group">
    <label>Content</label>
    <textarea type="text" className="form-control"  onChange={(e)=> Setnews({...news, content:e.target.value})} placeholder="Last Name" ></textarea>
  </div>
  <div className="form-group">
    <label>catageory</label>
    <div>
    <select class="w-100" onChange={(e)=> Setnews({...news, item:e.target.value})}>
    {
        categories.map((res,index)=>(
          <option key={index}>
          {res.title}
        </option>
        ))
        }
        
      </select>
    
    </div>

  </div>
  </div>


  <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
          
        </Modal.Footer>


  
</form>
        </Modal.Body>
      
      </Modal>
    </div>
  )
}
