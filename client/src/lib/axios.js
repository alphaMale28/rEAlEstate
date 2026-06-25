import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8000/api"
      : // : import.meta.env.VITE_API_URL,
        "https://realestate-s79a.onrender.com/api",
  withCredentials: true,
});
// console.log(import.meta.env.VITE_API_URL);

export default axiosInstance;
