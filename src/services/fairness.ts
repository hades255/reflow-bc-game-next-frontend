import { fetchAPI } from "./fetchAPI";

export const apiListRoulette = async () => {
  const response = await fetchAPI("/api/public/fairness/roulette", "POST");

  return response.data;
};
