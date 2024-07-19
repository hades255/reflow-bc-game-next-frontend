import { v4 as uuidv4 } from "uuid";

export const coinsTemplate = () => {
  const coins = [1, 2, 1, 2, 1, 3, 2, 1, 1, 2, 1, 2, 2, 1, 2];

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

  return coinsList
};
