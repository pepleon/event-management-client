import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Events = () => {

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [filterEvents, setFilterEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedDateFilter, setSelectedDateFilter] = useState('Date');


    const getEvents = async () => {
  
        if(events.length>0) return;


       try {
        
        
        const res = await axios.get(BASE_URL+"api/events/", {
         withCredentials: true
       });
           
       setEvents(res.data);
       setFilterEvents(res.data);
       console.log("API Called");
       console.log(events);

       }
     
     
     
       catch(err){
         console.error(err.message);
         navigate("/login");
       }
     
     }





useEffect(()=>{
        getEvents();
        console.log(events);
      },[])
      



  return (


    <div className='max-w-full'>


{/*///////////////////////////////////////*/}


    <div className='flex justify-center  text-centermy-10 text-3xl font-bold my-5'>Events</div>

{/*/////////////////////////////////////////////////////////*/}

    <div className="m-2 p-2 flex justify-center flex-col md:flex-row  items-center">

      <div className='flex justify-center'>
<input className="mx-3 p-2 px-2 w-96 border border-gray-200 rounded-md hover:border md:max-w-full  max-w-[50%]  items-center"  value={search} type="text"  placeholder="Search"
onChange={(e)=>{
  setSearch(e.target.value);
  }}
></input>


<button className="btn p-2 px-4 bg-gray-700 text-white rounded-md hover:shadow-md"
onClick={()=>{
  const searches = events.filter(
    (e)=> { return e.name.toLowerCase().includes(search.toLowerCase())}
  );
  setFilterEvents(searches);
}}
>Search</button>
</div>


<div>

<div className="dropdown px-2 py-2">
      <div tabIndex={0} role="button" className="btn m-1">
        {selectedCategory}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {["Technology", "Finance", "Marketing", "Education", "General"].map(
          (category) => (
            <li key={category} onClick={() => {setSelectedCategory(category);
              
              const selected = events.filter(
                (e)=> { return e.category.toLowerCase().includes(category.toLowerCase())}
              );
              setFilterEvents(selected);
            }}>
              <a>{category}</a>
            </li>
          )
        )}
      </ul>
    </div>


{/************* */}
    


    <div className="dropdown px-2 py-2">
  <div tabIndex={0} role="button" className="btn m-1">
    {selectedDateFilter}
  </div>
  <ul
    tabIndex={0}
    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
  >
    {["Upcoming", "Past", "Present"].map((filter) => (
      <li key={filter} onClick={() => {
        setSelectedDateFilter(filter);

        const filteredEvents = events.filter((e) => {
          const eventDate = new Date(e.date);
          const today = new Date();

         

          if (filter === "Upcoming") {
            return eventDate > today;
          } else if (filter === "Past" && eventDate != today) {
            return eventDate < today;
          } else if (filter === "Present") {
            return eventDate.toDateString() === today.toDateString();
          }
        });
        
        setFilterEvents(filteredEvents);
      }}>
        <a>{filter}</a>
      </li>
    ))}
  </ul>
</div>

</div>

{/*//////////////////////////// Date filter      ///////////////////////////*/}




  </div> 





{/*/////////////////////////////////////////////////////////*/}


<div className='flex justify-center py-7 max-w-full'>

    



    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 justify-center px-3 mx-auto my-10">
        

    {filterEvents.map((event) => {



  return (
    <div key={event?._id} className="card glass w-96">
      <div className="card-body">
        <h2 className="card-title">{event?.name}</h2>
        <p>{
          event?.description?.length > 30 ? event?.description?.substring(0, 30) + "..." : event?.description
          }</p>
        <div className="card-actions justify-between">
          <p className='min-w-full'>{event?.location}</p>
          <div className="flex items-center gap-5"> 
            <div className="badge badge-md">{event?.category}</div>
            <Link to={`/${event?._id}`}>
              <button className="btn btn-primary">Read More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
})}



    </div>
    </div> 

    </div>
  )

  
}



export default Events;