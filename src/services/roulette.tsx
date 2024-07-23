import { fetchAPI } from "./fetchAPI";
import { v4 as uuidv4 } from "uuid";

export const coinsTemplate = () => {
  const coins = [2, 1, 2, 1, 2, 1, 3, 2, 1, 2, 1, 2, 1, 2, 1];

  const tempList = coins.map((coin) =>
    coin === 1
      ? {
          value: coin,
          image: "/assets/roulette/red.png",
        }
      : coin === 2
      ? {
          value: coin,
          image: "/assets/roulette/black.png",
        }
      : {
          value: coin,
          image: "/assets/roulette/gold.png",
        }
  );

  const coinsList = [
    ...tempList.map((temp) => ({
      id: uuidv4(),
      ...temp,
    })),
    ...tempList.map((temp) => ({
      id: uuidv4(),
      ...temp,
    })),
    ...tempList.map((temp) => ({
      id: uuidv4(),
      ...temp,
    })),
    ...tempList.map((temp) => ({
      id: uuidv4(),
      ...temp,
    })),
    ...tempList.map((temp) => ({
      id: uuidv4(),
      ...temp,
    })),
    ...tempList.map((temp) => ({
      id: uuidv4(),
      ...temp,
    })),
  ];

  return coinsList;
};

export const getActive = async () => {
  const data = await fetchAPI("/api/public/games/roulette/active", "GET");
  return data;
};

export const placeBet = async (amount: number, bet: string) => {
  const data = await fetchAPI("/api/game/roulette/place-bet", "POST", {
    amount,
    bet,
  });
  return data;
};
