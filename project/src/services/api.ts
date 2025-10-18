import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  headers: { "Content-Type": "application/json" },
});

export const createProject = (payload: any) => api.post("/projects", payload);

export const uploadLogo = (file: File) => {
  const fd = new FormData();
  fd.append("file", file);
  return api.post("/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default api;
