import { fetchAPI } from "./fetchAPI";

export const getUsers = async (option: any) => {
  const data = await fetchAPI("/api/admin/users", "POST", option);
  return data;
}

export const setRole = async (data: any) => {
  const res = await fetchAPI("/api/admin/role/set", "POST", {
    data
  });
  return res;
}

export const setWhite = async (data: any) => {
  const res = await fetchAPI("/api/admin/whitelist/set", "POST", {
    data
  });
  return res;
}

export const getBonuses = async (option: any) => {
  const data = await fetchAPI("/api/admin/bonus/get", "POST", option);
  return data;
}

export const createBonus = async (params: any) => {
  const data = await fetchAPI("/api/admin/bonus/create", "POST", params);
  return data;
}

export const updateBonus = async (params: any) => {
  const data = await fetchAPI("/api/admin/bonus/update", "POST", params);
  return data;
}

export const removeBonus = async (id: number) => {
  const data = await fetchAPI("/api/admin/bonus/remove", "POST", { id });
  return data;
}