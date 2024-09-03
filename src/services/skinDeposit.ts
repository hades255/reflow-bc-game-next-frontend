import { fetchAPI } from "./fetchAPI";
import { waxpeerAPI } from "./waxpeer";

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

export const apiSetResult = async (txid: string) => {
  try {
    const response = await fetchAPI("/api/skin/deposit/setresult", "POST", {
      txid,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const apiWaxpeerDeposits = async ({
  steam_id,
  tx_id,
}: {
  steam_id: string;
  tx_id: string;
}) => {
  try {
    const response = await waxpeerAPI(
      `/v1/merchant/deposits?api=${process.env.NEXT_PUBLIC_WAXPEER_API_KEY}&merchant=cs2duel&steam_id=${steam_id}&tx_id=${tx_id}`,
      "POST"
    );

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
