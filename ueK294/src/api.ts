import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    "Content-Type": "application/json", // wichtig für POST/PUT
  }
});


export default api;