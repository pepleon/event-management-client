import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import DatePicker from './DatePicker';


const Editor = () => {

    const navigate = useNavigate();

    const { Id } = useParams();
    const [event, setEvent] = useState({}); 
    const [location, setLocation] = useState(""); 
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [mess, setmess] = useState(false);
    const [status, setStatus] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [date, setDate] = useState("");

    const getEvent = async () => {
        try {
          const res = await axios.get(`${BASE_URL}api/events/${Id}`, {
            withCredentials: true
          });
          setEvent(res.data);

          setLocation(res.data.location);
          setSelectedCategory(res.data.category);
          setName(res.data.name);
          setDescription(res.data.description);
          

        } catch (err) {
          console.error(err.message);
        }
      };
    

      useEffect(() => {
        getEvent(); 
        
  
        
    
    }, [])


   
const handleUpdate = async () => {
    try{

    await axios.put(`${BASE_URL}api/events/${Id}`, {
         name,
         description,
         category: selectedCategory,
         location,
         date,


    },{
        withCredentials: true
    })

    setmess(true);
    setStatus("Updated");

    setTimeout(()=>{
       setmess(false);
    }, 3000);


    }

    catch(err){
        console.log(err.message);
    }
}


const handledelete = async() => {
    try{
      await axios.delete(`${BASE_URL}api/events/${Id}`,{
        withCredentials:true,
      })

      setmess(true);
      setStatus("Deleted");
  
      setTimeout(()=>{
         setmess(false);
      }, 3000);
     
      navigate('/createdevents');
    }
    catch(err){
        console.error(err.message);
    }
}


if (Object.keys(event).length === 0){
    return (
        <div className='flex justify-center py-10 px-10 md:px-80 h-[80vh]'>
            <div className="card glass w-full ">
                <div className='flex justify-center'>
                <h1 className='md:text-4xl my-20'>Event Does Not Exist</h1>
                </div>
            

            </div>
        </div>
    )
}



const handleDateChange = (selectedDate) => {
  console.log(date)
  setDate(selectedDate); 
};

  return (
    <>
    <div className='flex justify-center py-10 px-10 md:px-80'>
      <div className="card glass w-full">
        <div className='flex justify-between'>
          <div className="badge badge-secondary md:m-10 m-4">
            <input
              type="text"
              placeholder="Type here"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input input-bordered input-xs w-full max-w-xs bg-pink-700"  />
              
          </div>
          <div className=" md:m-10 m-4">
          <div className="dropdown px-4 py-2">
      <div tabIndex={0} role="button" className="btn m-1">
        {selectedCategory}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {["Technology", "Finance", "Marketing", "Education", "General"].map(
          (category) => (
            <li key={category} onClick={() => setSelectedCategory(category)}>
              <a>{category}</a>
            </li>
          )
        )}
      </ul>
    </div>

          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title text-2xl md:text-3xl">
          <input
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs" />

          </h2>
          <p className='md:text-xl'>
          <textarea className="textarea textarea-primary" placeholder="Bio"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          </p>
          <div className="card-actions justify-end">
<DatePicker onDateChange={handleDateChange}/>

          <button class="btn btn-accent"
          onClick={handleUpdate}
          >Update</button>
          </div>

          <div className="card-actions justify-end">
          <button class="btn btn-error"
          onClick={handledelete}
          >Delete</button>
          </div>
        </div>
      </div>
    </div>


{mess && <div className="toast toast-top toast-center">
    <div className="alert alert-success">
      <span>{"Event "+status+" successfully."}</span>
    </div>
  </div>}

  </>
  )
}

export default Editor;