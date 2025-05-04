// src/services/userService.js
import axiosInstance from "../axiosInstance";

export async function getUsers(page = 1, perPage = 10) {
  // JSONPlaceholder uses _page & _limit for pagination
  const res = await axiosInstance.get("/unknown", {
    params: { page: page, per_page: perPage },
  });
  // It returns X-Total-Count in headers
//   const total = parseInt(res.headers["x-total-count"] || "0", 10);
  return {
    data: res.data.data,
    total: res.data.total,
  };
}
