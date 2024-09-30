"use client";

import React, { FC, useState, useEffect } from "react";
import IconWithdraw from "@/utils/icons/Withdraw";
import IconCoin from "@/utils/icons/Coin";
import Button from "@/components/buttons/Button";
import IconDeposit from "@/utils/icons/Deposit";
import PaymentItem from "@/components/deposit/PaymentItem";
import { useRouter } from "next/navigation";
import { depositTokenList } from "@/utils";

import { useUser } from "@/redux/slices/main/userSlice";
import { setModal } from "@/redux/slices/main/modalSlice";
import { useDispatch } from "react-redux";
import { apiCreateWithdraw } from "@/services/payment";
import { setToast } from "@/redux/slices/main/toastSlice";

const DepositPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useUser();
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState("");
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      dispatch(
        setModal({
          status: true,
          title: "Sign In",
          content: "Please sign in.",
          name: "Steam Sign In",
          type: 2,
          parameter: `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`,
        })
      );
    }
  }, [user, dispatch]);

  const handleWithdrawClick = async (item: any) => {
    const foundToken = depositTokenList.find(
      (i) => i.currency === item.currency
    );
    setToken(foundToken);
  };

  const handleRequestWithdraw = async () => {
    if (amount !== "" && user && address !== "") {
      const data = await apiCreateWithdraw({
        amount: Number(amount),
        address: address,
        currency: token.currency,
      });

      console.log(data.data);

      if (data.data.status === "error") {
        dispatch(
          setToast({
            type: 1,
            message: data.data.message,
          })
        );
      } else if (
        data.data.status === "success" ||
        data.data.status === "waiting" ||
        data.data.status === "pending"
      ) {
        dispatch(
          setToast({
            type: 2,
            message: "Success Withdraw Request, Please wait.",
          })
        );
      }
    } else if (amount === "") {
      dispatch(
        setToast({
          type: 4,
          message: "Please input correct amount",
        })
      );
    } else if (address === "") {
      dispatch(
        setToast({
          type: 4,
          message: "Please input correct address",
        })
      );
    }
  };

  return (
    <>
      {token === null ? (
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-row items-center gap-1">
            <IconDeposit color="#E9AE15" width={18} height={10} />
            <p className="font-bold text-[18px] text-[#D1D1D1] capitalize">
              Withdraw
            </p>
          </div>

          <p className="text-white font-semibold text-[18px] capitalize">
            Skin
          </p>

          <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] grid grid-cols-8 gap-6">
            <PaymentItem
              icon="/assets/images/payments/csgo.webp"
              title="CS:GO"
              description="Waxpeer"
              type={0}
              onClick={() => router.push("/skin/withdraw")}
            />
          </div>

          <p className="text-white font-semibold text-[18px] capitalize">
            Crypto
          </p>

          {/* <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] grid grid-cols-2 gap-6">
            <input
              value={amount}
              onChange={(e: any) => setAmount(e.target.value)}
              type="text"
              placeholder="Withdraw Amount"
              className="bg-[#1A1A1A] dropBlack p-[8px_12px_8px_12px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
            />

            <input
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
              type="text"
              placeholder="Withdraw Address"
              className="bg-[#1A1A1A] dropBlack p-[8px_12px_8px_12px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
            />
          </div> */}

          <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] grid grid-cols-8 gap-6">
            {depositTokenList.map((item, index) => (
              <PaymentItem
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                type={1}
                onClick={() => handleWithdrawClick(item)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-row items-center gap-1 justify-between">
            <div className="flex flex-row items-center gap-1">
              <IconWithdraw color="#E9AE15" width={18} height={10} />
              <p className="font-bold text-[18px] text-[#D1D1D1] capitalize">
                Withdraw {token?.title}
              </p>
            </div>

            <Button
              text="Back"
              className="!w-[100px]"
              clicked={() => setToken(null)}
            />
          </div>
          <p className="font-normal text-[12px] text-[#D1D1D1]">
            you can typically withdraw up to 2,000 coins before KYC checks are
            required, but sometimes our security system will trigger these
            checks before this limit is reached. you can view more information
            on this here
          </p>

          <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] flex flex-col gap-6">
            <p className="text-[12px] font-normal text-[#D1D1D1]">
              Please enter the {token?.title} wallet address you want the
              withdrawal to be sent to. all {token?.title} withdraws are sent
              instantly.
            </p>

            <div className="flex gap-[5px] items-center">
              <p className="text-white font-semibold text-[18px] capitalize">
                Receiving {token?.title} address
              </p>
            </div>

            <div className="flex items-center gap-[5px]">
              <div className="relative flex w-full">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-[#1A1A1A] dropBlack p-[8px_12px_8px_12px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
                />
              </div>

              <div className="relative flex w-[120px]">
                <div className="absolute top-[9px] left-[12px]">
                  <IconCoin color="#E9AE15" width={16} height={17} />
                </div>
                <input
                  type="text"
                  className="bg-[#101010] border-[#1A1A1A] border-[1px] p-[8px_12px_8px_32px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
                  value={amount}
                  onChange={(e) => setAmount(String(e.target.value))}
                />
              </div>

              {/* <div className="min-w-[34px] h-[34px] flex justify-center items-center bg-[#1A1A1A] rounded-[2px] cursor-pointer">
                <IconChange color="#9C9C9C" width={12} height={10} />
              </div>

              <div className="relative flex w-[120px]">
                <input
                  value={1268904}
                  type="text"
                  className="bg-[#101010] border-[#1A1A1A] border-[1px] p-[8px_12px_8px_32px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
                />
                <Image
                  src={arbitrum}
                  alt="icon"
                  className="absolute top-[9px] left-[12px]"
                />
              </div> */}
            </div>

            {/* <p className="text-white font-semibold text-[18px] capitalize">
              Network fee
            </p>

            <div className="flex gap-[46px] items-center">
              <div className="flex gap-[6px] items-center">
                <Switch status={fee === 1} onClick={() => setFee(1)} />
                <div className="flex gap-1 items-center">
                  <p className="font-bold text-[#707070] text-[12px]">Slow-</p>
                  <IconCoin color="#E9AE15" width={16} height={17} />
                  <p className="font-bold text-[#707070] text-[12px]">7.88</p>
                </div>
              </div>

              <div className="flex gap-[6px] items-center">
                <Switch status={fee === 2} onClick={() => setFee(2)} />
                <div className="flex gap-1 items-center">
                  <p className="font-bold text-[#707070] text-[12px]">
                    Standard-
                  </p>
                  <IconCoin color="#E9AE15" width={16} height={17} />
                  <p className="font-bold text-[#707070] text-[12px]">8.56</p>
                </div>
              </div>

              <div className="flex gap-[6px] items-center">
                <Switch status={fee === 3} onClick={() => setFee(3)} />
                <div className="flex gap-1 items-center">
                  <p className="font-bold text-[#707070] text-[12px]">Fast-</p>
                  <IconCoin color="#E9AE15" width={16} height={17} />
                  <p className="font-bold text-[#707070] text-[12px]">9.23</p>
                </div>
              </div>
            </div> */}

            <div className="flex justify-between items-center">
              {/* <div className="flex flex-col">
                <p className="text-[#5D5D5D] text-[12px] font-bold">Total</p>
                <div className="flex gap-[2px] items-center">
                  <IconCoin color="#E9AE15" width={16} height={17} />
                  <p className="text-[12px] font-bold text-[#D1D1D1]">156,65</p>
                </div>
              </div> */}

              <Button
                text="Request Withdraw"
                className="!w-[143px]"
                clicked={handleRequestWithdraw}
              />
            </div>
          </div>

          {/* <div className="flex justify-between">
            <p className="text-[12px] font-medium text-[#9C9C9C]">
              Transactions
            </p>
            <select className="bg-[#121212] text-[12px] font-medium text-[#9C9C9C] outline-none">
              <option>10 Per Page</option>
            </select>
          </div> */}
        </div>
      )}
    </>
  );
};

export default DepositPage;
