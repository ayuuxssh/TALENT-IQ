import axios from "axios"

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_UPL,
    withCredentials:true,
})

export default axiosInstance;