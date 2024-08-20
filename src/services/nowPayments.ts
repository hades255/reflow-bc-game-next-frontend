import axios from "axios";

interface NowPaymentProps {
  url: string;
  method: string;
  data?: any;
}

const nowPayment = async ({ url, method, data }: NowPaymentProps) => {
  const config = {
    baseUrl: "https://api-sandbox.nowpayments.io/v1",
    headers: {
      "x-api-key": "VH4T17V-5D447PE-GVSZHKY-077X4DQ",
    },
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

export default nowPayment;
