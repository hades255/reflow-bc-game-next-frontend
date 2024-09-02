import { fetchAPI } from "./fetchAPI";

interface CreatePaymentProps {
  user_id: number,
  amount: number;
  pay_currency: string;
}

interface CreateWithdrawProps {
  user_id: number,
  amount: number;
  address: string;
  currency: string;
}

export const apiCreatePayment = async ({
  user_id,
  amount,
  pay_currency,
}: CreatePaymentProps) => {
  const response = await fetchAPI("/api/crypto/create-deposit", "POST", {
    user_id,
    amount,
    pay_currency,
  });

  return response.data;
};


export const apiCreateWithdraw = async ({
  user_id,
  amount,
  address,
  currency,
}: CreateWithdrawProps) => {
  const response = await fetchAPI("/api/crypto/create-withdraw", "POST", {
    user_id,
    amount,
    address,
    currency,
  });

  return response.data;
};
