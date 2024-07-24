import { fetchAPI } from "./fetchAPI";

export const apiGetItems = async (
  scroll?: number,
  price: any,
  from?: number,
  to?: number,
  search?: string | null
) => {
  const response = await fetchAPI("/api/public/fetch-cs-skins", "POST", {
    price,
    from,
    to,
    search,
    scroll,
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
