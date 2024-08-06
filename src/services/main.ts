import { fetchAPI } from "./fetchAPI";

export const getUserInfo = async () => {
  let data = await fetchAPI("/api/user", "POST");
  return data;
}