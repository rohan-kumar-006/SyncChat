import axios from "axios"

const DB_URL=import.meta.env.VITE_DB_URI
console.log(DB_URL)
export const axiosInstance=axios.create({
    baseURL:DB_URL,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
    }
})