import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';



const Login = () => {



    const [email, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [username, setUsertName] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [rePassword, setRePassword] = useState("");
    
 
    const navigate = useNavigate();
   const handlLogin = async () => {
   try{
   
       
        
       const res = await axios.post(BASE_URL+"api/auth/login" ,{
           email,
           password 
       },{
           withCredentials: true
       });
   
       console.log(res);
       
       navigate("/");

       window.location.reload();
   }
   catch(err){
    console.log(err);
     setError(err.response.data.message);
     
   }
   
   };
   
   
   const handleSignup = async () => {
     try{
       if(!verifyRePass()) return;
       const res = await axios.post(BASE_URL+"api/auth/register",{
         username, email, password
       }, {
         withCredentials:true,
       });
      
      
       navigate("/");
       window.location.reload();
     }
     catch(err){
       setError("Something went wrong");
       
     }
   }
   


const handleguest = async () => {
  try{

    const res = await axios.post(BASE_URL+"api/auth/login" ,{
      email: "guest@guest.com",
      password: "Test@123" 
  },{
      withCredentials: true
  });

  console.log(res);
  
  navigate("/");

  window.location.reload();

  }
  catch(err){
    console.log(err.message);
  }
}






   const verifyRePass = () => {
     if (password != rePassword) {
       setError("Passwords do not match");
      return false;
     } else return true;
   }
     return (
       <div className='flex justify-center my-10'>
           <div className="card bg-base-300 w-96 shadow-xl">
       <div className="card-body">
         <h2 className="card-title justify-center">{isLogin? "Login" : "SignUp"}</h2>
        
        
         <div >
   {  !isLogin &&  ( <>
   
   <label className="form-control w-full max-w-xs my-2">
     <div className="label">
       <span className="label-text">Username</span>
     </div>
     <input type="text" className="input input-bordered w-full max-w-xs" 
       value = {username}
       onChange={(e)=>{setUsertName(e.target.value)}}
     />
   
   </label>
   </>
   )}
   
         <label className="form-control w-full max-w-xs my-2">
     <div className="label">
       <span className="label-text">Email ID</span>
     </div>
     <input type="text" className="input input-bordered w-full max-w-xs" 
       value = {email}
       onChange={(e)=>{setEmailId(e.target.value)}}
     />
   
   </label>
   
   <label className="form-control w-full max-w-xs my-2">
     <div className="label">
       <span className="label-text">Password</span>
     </div>
     <input type="text" className="input input-bordered w-full max-w-xs" 
     value={password}
     onChange={(e)=>{setPassword(e.target.value)  }}
     />
   
   </label>
   
   { !isLogin && (<label className="form-control w-full max-w-xs my-2">
     <div className="label">
       <span className="label-text">Password Again</span>
     </div>
     <input type="text" className="input input-bordered w-full max-w-xs" 
     value={rePassword}
     onChange={(e)=>{setRePassword(e.target.value) }}
     />
   
   </label>)}
   
         </div>
         <p className='text-red-500'>{error}</p>
         <div className="card-actions justify-center m-2">
           <button className="btn btn-primary" onClick={isLogin? handlLogin : handleSignup}>{isLogin? "Login" : "SignUp"}</button>
           <button className="btn glass" onClick={handleguest}>Guest</button> 
         </div>
         <p className='m-auto cursor-pointer py-2'
         onClick={()=>setIsLogin(!isLogin)}
         >{isLogin? "New user? SignUp here" : "Existing user? Sign In here "}</p>
       </div>
     </div></div>
     )
   }



   export default Login;