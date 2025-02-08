import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Events from "./components/Events"
import Event from "./components/Event"
import Body from "./components/Body"
import EditEvent from "./components/EditEvent"
import Editor from "./components/Editor"
import CreateEvent from "./components/CreateEvent"
function App() {
  

  return (
    <>
      <BrowserRouter basename="/">
 <Routes>
<Route path="/" element={<Body/>}>
<Route path="/" element={<Events/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/:Id" element={<Event/>}/>
<Route path="/edit/:Id" element={<Editor/>}/>
<Route path="/createdevents" element={<EditEvent/>}/>
<Route path="/createevents" element={<CreateEvent/>}/>
</Route>

 </Routes>
 
 </BrowserRouter>
    </>
  )
}

export default App
