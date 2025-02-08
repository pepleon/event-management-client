import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {

const SERVER_URL = window.location.hostname === "localhost" ? BASE_URL : "https://event-management-backend-dzvv.onrender.com";

return io(SERVER_URL, { path: "/api/socket.io" });

    

};
