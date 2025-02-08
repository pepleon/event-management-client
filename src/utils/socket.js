import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  const SERVER_URL = 
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? BASE_URL
      : "https://event-management-backend-dzvv.onrender.com"; // Ensure it's correct

  const token = localStorage.getItem("token"); // Retrieve JWT Token

  console.log("Connecting to:", SERVER_URL, "with token:", token);

  return io(SERVER_URL, {
    path: "/api/socket.io",
    withCredentials: true,  // Ensures cookies are sent
    auth: {
      token: token,  // Send JWT in authentication
    },
  });
};
