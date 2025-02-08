import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import DatePicker from './DatePicker';


const CreateEvent = () => {

    const [mess, setmess] = useState(false);
    const [event, setEvent] = useState({}); 
    const [location, setLocation] = useState(""); 
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");   
    const [error, setError] = useState(""); 
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [date, setDate] = useState("");
 


    const saveEvent = async() => {

try 
{  const res =  await axios.post(BASE_URL+"api/events/",{
     name,
     category: selectedCategory,
     description,
     location,
     date: date,

    },{
        withCredentials:true,
    })

    setmess(true);


    setTimeout(()=>{
       setmess(false);
    }, 3000);

 console.log(res);   
}catch(err){
    setError(err.message);
    console.log(err);
}
  
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
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input input-bordered input-xs w-full max-w-xs bg-pink-700"  />
              
          </div>
          <div className="md:m-10 m-4">
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
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs" />

          </h2>
          <p className='md:text-xl'>
          <textarea className="textarea textarea-primary" placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          </p>
          <div className="card-actions justify-end">

{/******** */}





<DatePicker onDateChange={handleDateChange} />



{/* */}










            
          <button class="btn btn-accent"
          onClick={saveEvent}
          >Save</button>
          </div>
          <p className='text-red-500'>{error}</p>
        </div>
        
      </div>
      
    </div>


{mess && <div className="toast toast-top toast-center">
    <div className="alert alert-success">
      <span>{"Event Saved Successfully!!!"}</span>
    </div>
  </div>}

  </>
  )
}

export default CreateEvent