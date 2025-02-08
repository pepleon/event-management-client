import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./constants";


const useGetEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const getEvents = async () => {
    if (events.length > 0) return; 

    try {
      const res = await axios.get(`${BASE_URL}api/events/created`, {
        withCredentials: true,
      });

      setEvents(res.data);
      console.log("API Called");
    } catch (err) {
      console.error(err.message);
    
    }
  };

  useEffect(() => {
    getEvents(); 
  }, []);

  return { events, getEvents };
};

export default useGetEvents;
