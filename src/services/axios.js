import axios from "axios";


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.timeout = 200000;

export default axiosInstance;
