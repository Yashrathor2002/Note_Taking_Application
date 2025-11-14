import axios from "axios";

export const API = axios.create({
  baseURL: "https://note-taking-application-backend.vercel.app",
});
