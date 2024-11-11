import axios from "axios";

const base = process.env.NODE_ENV === "production" ? "https://youtube.mehuls.in/api" : "http://localhost:3000/api";

const instance = axios.create({
  baseURL: base,
});

export default instance;
