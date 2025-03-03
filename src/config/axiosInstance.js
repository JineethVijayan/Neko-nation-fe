// import axios from 'axios';

// //console.log(import.meta.env.VITE_API_URL);

// const axiosInstance = axios.create({
//   baseURL:`${import.meta.env.VITE_API_URL}/api/v1`,
//   withCredentials: true,
// });

// export default axiosInstance;


import axios from "axios";

const axiosInstance = axios.create({
  baseURL:`${import.meta.env.VITE_API_URL}/api/v1`,
   withCredentials: true,
});

// Automatically attach JWT token for authenticated requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
