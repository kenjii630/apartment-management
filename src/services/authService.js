// src/services/authService.js
import axiosInstance from "./axiosInstance";

export async function login(data) {
  const res = await axiosInstance.post("/login", data);
  // res.data should include { token, refresh_token, user? }
  return res.data;
}

export async function register(data) {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
}

// ReqRes has a “get single user” at /users/:id
export function fetchProfile(id = 2) {
  return axiosInstance.get(`/users/${id}`);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
}
