import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// We will add interceptors here later to automatically attach JWT tokens
// when the user logs in, ensuring secure communication with Django.

export default api;
