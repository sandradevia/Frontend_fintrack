import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // sesuaikan dengan base URL Laravel kamu
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getCategories = () => api.get("/category");
export const getCategory = (id: number) => api.get(`/category/${id}`);
export const createCategory = (data: any) => api.post("/category", data);
export const updateCategory = (id: number, data: any) =>
  api.put(`/category/${id}`, data);
export const deleteCategory = (id: number) =>
  api.delete(`/category/${id}`);
