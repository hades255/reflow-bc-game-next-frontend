import { fetchAPI } from "./fetchAPI";

export const apiListRoulette = async () => {
  const response = await fetchAPI("/api/public/fairness/roulette", "POST");

  return response.data;
};

export const apiListRoyalflip = async ({
  perPage,
  page,
}: {
  perPage: number;
  page: number;
}) => {
  const response = await fetchAPI("/api/game/royalflip/mygame", "POST", {
    perPage,
    page,
  });

  return response.data;
};

export const apiListUpgrader = async ({
  perPage,
  page,
}: {
  perPage: number;
  page: number;
}) => {
  const response = await fetchAPI("/api/game/upgrader/mygame", "POST", {
    perPage,
    page,
  });

  return response.data;
};
