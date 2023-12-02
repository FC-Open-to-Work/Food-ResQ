import axios from "axios";

const api_domain = process.env.BACKEND_API_DOMAIN
    ? process.env.BACKEND_API_DOMAIN
    : "localhost";

const api_url = "http://" + api_domain + ":5000";

const axiosWithCookies = axios.create({
    withCredentials: true,
});

export { axiosWithCookies, api_url };