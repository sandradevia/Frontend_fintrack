import axios from "../lib/axios";
import { Category } from "types/category";

export const getCategories = async () => {
  const response = await axios.get("/category");
  return response.data;
};
