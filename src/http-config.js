import axios from "axios";
import authHeader from "./utils/auth-header";

export default axios.create({
    baseURL: "https://localhost:7058/api",
    headers: authHeader()
});