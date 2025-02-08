import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Navbar = () => {

const navigate = useNavigate();
const [user, setUser] = useState(null);
const getProfile = async() =>{

try{
  
  const res = await axios.get(BASE_URL+"profile/",{withCredentials: true});
console.log(res.data);
setUser(res.data);

}
catch(err){
  console.log(err.message);
}

}




const handleLogout = async () => {

  try{

    await axios.post(BASE_URL+"api/auth/logout",{},{
      withCredentials: true,
    })
    setUser(null);
    return navigate("/login");
  }
  catch(err){
    console.log(err.message);
  }

}








useEffect(()=>{
  getProfile();
}, [])


  return (
    <div className="navbar bg-base-300 max-w-full">
    <div className="flex-1">
    <Link to={'/'} className="btn btn-ghost text-xl">Events</Link>
    </div>
    { user && user?.email != "guest@guest.com" &&
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1 text-lg">
        <li><Link to={'/createdevents'}>Your Events</Link></li>
        <li>
          <details>
            <summary>{"Hello! "+user?.username}</summary>
            <ul className="bg-base-100 rounded-t-none mx-10">
              <li><Link to={"/createevents"}>Create Event</Link></li>
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
    }

    { user?.email==="guest@guest.com" &&
       <div className="flex-none">
       <ul className="menu menu-horizontal px-1 text-lg">
         
         <li>
           <details>
             <summary>{"Hello! "+user?.username}</summary>
             <ul className="bg-base-100 rounded-t-none mx-10">
               <li onClick={handleLogout}><a>Login</a></li>
             </ul>
           </details>
         </li>
       </ul>
     </div>
    }
  </div>
  )
}

export default Navbar;