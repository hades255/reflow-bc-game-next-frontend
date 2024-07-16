import { fetchAPI } from "./fetchAPI";
import { v4 as uuidv4 } from "uuid";

export const apiGetItems = async (
  price: string,
  sortBy: string,
  search?: string | null
) => {
  const response = await fetchAPI("/api/public/fetch-cs-skins", "POST", {
    price,
    sortBy,
    search,
  });
  return response.data;
};

export const apiPlayGame = async (skinId: number, betAmount: number) => {
  const response = await fetchAPI("/api/game/upgrader/play", "POST", {
    skinId,
    betAmount,
  });
  return response.data;
};
