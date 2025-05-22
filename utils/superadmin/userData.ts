// src/services/userData.ts
import axiosInstance from "lib/axios";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  branch_id: number;
  role: string;
};

export type Branch = {
  id: number;
  branch_name: string;
  branch_code: string;
};

// Tipe input untuk createUser, tanpa id dan branch
type NewUserInput = Omit<User, "id" | "branch">;

export const getUsers = async () => {
  const response = await axiosInstance.get("/user");
  return response;
};

export const getUserById = async (id: number) => {
  const response = await axiosInstance.get(`/user/${id}`);
  return response;
};

export const createUser = async (userData: NewUserInput) => {
  const response = await axiosInstance.post("/user", userData);
  return response;
};

export const updateUser = async (id: number, userData: User) => {
  const payload: Partial<User> = {
    name: userData.name,
    email: userData.email,
    branch_id: userData.branch_id,
    role: userData.role,
  };

  // Kirim password hanya jika tidak kosong
  if (userData.password && userData.password.trim() !== "") {
    payload.password = userData.password;
  }

  const response = await axiosInstance.put(`/user/${id}`, payload);
  return response;
};


export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`/user/${id}`);
  return response.data;
};

export const getBranches = async () => {
  const response = await axiosInstance.get("/branch"); // Adjust this endpoint based on your actual API
  return response;
};
