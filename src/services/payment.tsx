import { fetchAPI } from "./fetchAPI";

interface CreatePaymentProps {
  pay_currency: string;
}

interface CreateWithdrawProps {
  amount: number;
  address: string;
  currency: string;
}

export const apiCreatePayment = async ({
  pay_currency,
}: CreatePaymentProps) => {
  const response = await fetchAPI("/api/crypto/create-deposit", "POST", {
    pay_currency,
  });

  return response.data;
};

export const apiCheckMiniDeposit = async ({
  pay_currency,
}: CreatePaymentProps) => {
  const response = await fetchAPI("/api/public/check-mini-deposit", "POST", {
    pay_currency,
  });

  return response.data;
};

export const apiCreateWithdraw = async ({
  amount,
  address,
  currency,
}: CreateWithdrawProps) => {
  const response = await fetchAPI("/api/crypto/create-withdraw", "POST", {
    amount,
    address,
    currency,
  });

  return response.data;
};
