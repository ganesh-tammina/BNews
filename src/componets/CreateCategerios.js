import React,{useState, useEffect}  from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'

export default function CreateCategerios({mylogin, newimg}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [catagerious, Setcatagerious] = useState({
        title:"",
    })

      useEffect(()=>{
       },[])

    const handleCategeory = (e)=>{
        e.preventDefault()
        const mydata = {catagerious}
        console.log(catagerious)
        mylogin(mydata)
        
      }
   
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Catagerory
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleCategeory}>
  <div className="form-row">
  <div className="form-group">
    <label>catagerious</label>
    <input type="text" className="form-control"  onChange={(e)=> Setcatagerious({...catagerious, title:e.target.value})} placeholder="Last Name" />
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
