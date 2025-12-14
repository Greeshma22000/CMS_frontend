import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001/api"
});

API.interceptors.request.use((req) => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if(admin?.token){
        req.headers.Authorization = `Bearer ${admin.token}`;
    }
    return req;
})

export default API;