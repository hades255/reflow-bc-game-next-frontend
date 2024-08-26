import { fetchAPI } from "./fetchAPI";

export const apiSetTradeLink = async () => {
  try {
    const response = await fetchAPI("/api/skin/settradelink", "POST", {
      tradelink:
        "https://steamcommunity.com/tradeoffer/new/?partner=15521512321&token=PDodkdjf",
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
  transactionId: number;
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
