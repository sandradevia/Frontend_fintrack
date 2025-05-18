import axios from "./axios";

export const login = async (email: string, password: string) => {
  const response = await axios.post("/login", {
    email,
    password,
  });

  const { token, user } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user_id", user.id.toString());
  localStorage.setItem("branch_id", user.branch_id.toString());
  localStorage.setItem("name", user.name);
  localStorage.setItem("role", user.role);

  return response.data;
};

export const logout = async () => {
  const token = localStorage.getItem("token");

  if (!token) return;

  await axios.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("branch_id");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
};
