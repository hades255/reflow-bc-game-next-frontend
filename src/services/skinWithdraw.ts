import { fetchAPI } from "./fetchAPI";
import { waxpeerAPI } from "./waxpeer";

export const apiSetTradeLink = async ({ tradelink }: { tradelink: string }) => {
  try {
    const response = await fetchAPI("/api/skin/settradelink", "POST", {
      tradelink,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const apiBuyItem = async ({ name }: { name: string }) => {
  try {
    const response = await fetchAPI("/api/skin/withdraw/buyitem", "POST", {
      name,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const apiSetResult = async ({
  transactionId,
}: {
  transactionId: string;
}) => {
  try {
    const response = await fetchAPI("/api/skin/withdraw/setresult", "POST", {
      transactionId,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const apiGetHistory = async ({
  pageNum,
  perPage,
}: {
  pageNum: string;
  perPage: string;
}) => {
  try {
    const response = await fetchAPI("/api/skin/withdraw/gethistory", "POST", {
      pageNum,
      perPage,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const apiCheckManySteam = async (id: string) => {
  try {
    const response = await waxpeerAPI(
      "/v1/check-many-steam?api=" +
        process.env.NEXT_PUBLIC_WAXPEER_API_KEY +
        "&id=" +
        id,
      "GET"
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
