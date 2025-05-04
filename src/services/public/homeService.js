import axiosInstance from "../axiosInstance";

export function getHomeData() {
  return axiosInstance.get("/posts");
}
