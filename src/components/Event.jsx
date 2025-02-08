import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { createSocketConnection } from '../utils/socket';

const Event = () => {
  const navigate = useNavigate();
  const { Id } = useParams();
  
  const [event, setEvent] = useState({}); 
  const [attendeeCount, setAttendeeCount] = useState(0);

  const getEvent = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/events/${Id}`, {
        withCredentials: true
      });
      setEvent(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEvent();
   const socket = createSocketConnection();
   socket.emit("readEvent",  {Id}) 

   attendance();

   socket.on("receiveAttendance", ({count}) => {
         
    setAttendeeCount(attendeeCount+count);
    console.log(count);
   })
   return () => {
      socket.disconnect();
   }

  }, []);


  const attendance = () =>{
    const socket = createSocketConnection();
    socket.emit("attendance", {
      Id
    })
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


const formattedDate = new Date(event?.date).toLocaleDateString('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})




  return (
    <div className='flex justify-center py-10 px-10 md:px-80'>
      <div className="card glass w-full">
        <div className='flex justify-between'>
          <div className="badge badge-secondary md:m-10 m-4">{event?.location}</div>
          <div className="badge badge-accent md:m-10 m-4">{event?.category}</div>
        </div>
        <div className="card-body">
          <h2 className="card-title text-2xl md:text-3xl">{event?.name}</h2>
          <p className='md:text-xl'>{event?.description}</p>

          

          <div className="card-actions justify-end  items-center">
          <div class="badge badge-primary">{formattedDate}</div>
            <button className="btn">
            
              Attendees: 
              <div className="badge badge-secondary">{attendeeCount}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event;