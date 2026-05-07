import axios from "axios";

const API = axios.create({
  baseURL: "https://teamtaskmanager-ait8.onrender.com/api",
});

export default API;