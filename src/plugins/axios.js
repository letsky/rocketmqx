import axios from "axios";

const service = axios.create({
  baseURL: "http://10.0.27.180:8080/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});


export default service;