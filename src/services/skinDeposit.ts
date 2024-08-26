import { fetchAPI } from "./fetchAPI";

export const apiGetInventory = async () => {
  try {
    const response = await fetchAPI("/api/skin/deposit/getinventory", "POST");
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const apiListInventory = async ({
  itemId,
  price,
}: {
  itemId: number;
  price: number;
}) => {
  try {
    const response = await fetchAPI("/api/skin/deposit/listinventory", "POST", {
      itemId,
      price,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
