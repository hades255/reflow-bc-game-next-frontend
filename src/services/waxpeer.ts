import axios from "axios";

interface Params {
  baseUrl: string | undefined;
  method: string;
}

export const waxpeerAPI = async (
  url: string,
  method: string,
  data?: any
): Promise<any> => {
  const config: Params = {
    baseUrl: process.env.NEXT_PUBLIC_WAXPEER_API_HOST,
    method: method,
  };

  return await axios({
    ...config,
    url: `${config.baseUrl}${url}`,
    data,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};
