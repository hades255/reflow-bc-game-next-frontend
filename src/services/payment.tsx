import { fetchAPI } from "./fetchAPI";

interface CreatePaymentProps {
  amount: number;
  pay_currency: string;
}

export const apiCreatePayment = async ({
  amount,
  pay_currency,
}: CreatePaymentProps) => {
  const response = await fetchAPI("/api/crypto/create-deposit", "POST", {
    amount,
    pay_currency,
  });

  return response.data;
};
