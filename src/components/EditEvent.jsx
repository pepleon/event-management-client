import React, { useState } from 'react'
import useGetEvents from "../utils/useGetEvents";
import { Link, useNavigate } from 'react-router-dom';

const EditEvent = () => {

    const { events, getEvents } = useGetEvents();
  
  

  return (
    <>
    <div className='flex justify-center  text-centermy-10 text-3xl font-bold my-5'>Your Created Events</div>
<div className='flex justify-center py-10'>

    



    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 justify-center px-3 mx-auto my-10">
        

{ events.map((event) =>(
    <div className="card glass w-96">
    <div className="card-body">
      <h2 className="card-title">{event?.name}</h2>
      <p>{event?.description?.length > 30 ? event?.description?.substring(0, 30) + "..." : event?.description}</p>
      <div className="card-actions justify-between">
          <p>{event?.location}</p>
          <Link to={"/edit/"+event?._id} >
        <button className="btn btn-secondary">Edit</button>

        </Link>
      </div>
    </div>
  </div>
))   }



    </div>
    </div> 

    </>
  )
}

export default EditEvent;