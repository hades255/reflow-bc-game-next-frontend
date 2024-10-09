import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/slices/main/modalSlice";
import { setToast } from "@/redux/slices/main/toastSlice";
import { useUser } from "@/redux/slices/main/userSlice";
import { useBalance } from "@/redux/slices/main/balanceSlice";
import { PiCoinsLight } from "react-icons/pi";

interface Props {
  bet: number;
  setBet: (val: number) => void;
  start: boolean;
}

const Betting: FC<Props> = ({ bet, setBet, start }) => {
  const user = useUser();
  const balance = useBalance().balance;
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      let val = parseFloat(e.target.value);
      if (0.1 <= val && val <= 250) {
        setBet(Number(val.toFixed(2)));
      }
      if (Number.isNaN(val) || val == 0) {
        setBet(0);
      }
    } else {
      dispatch(
        setModal({
          status: true,
          title: "Sign In",
          content: "Please sign in to start playing.",
          name: "Steam Sign In",
          type: 1,
          parameter: `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`,
        })
      );
    }
  };

  const changeBet = (betted: number) => {
    if (user) {
      let sum = bet + betted;
      if (sum <= balance && sum <= 250) {
        setBet(Number(sum.toFixed(2)));
      } else {
        if (balance > 250) {
          setBet(250);
        } else {
          setBet(Number(balance.toFixed(2)));
        }
      }
    } else {
      dispatch(
        setModal({
          status: true,
          title: "Sign In",
          content: "Please sign in to start playing.",
          name: "Steam Sign In",
          type: 1,
          parameter: `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`,
        })
      );
    }
  };

  return (
    <div className="w-[520px] mx-auto flex gap-2 items-center justify-between rounded-sm border border-[#252525] text-gold z-10 py-1 px-2">
      <div className="flex items-center gap-2">
        <PiCoinsLight />
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={bet == undefined || bet == 0 ? "" : bet}
          className="bg-transparent w-24 black-input no-spinner"
          max={balance > 250 ? 250 : balance}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-1">
        <button
          className="small-btn"
          onClick={() => {
            setBet(0);
          }}
        >
          CLEAR
        </button>
        <button className="small-btn" onClick={() => changeBet(0.5)}>
          +0.5
        </button>
        <button className="small-btn" onClick={() => changeBet(1)}>
          +1
        </button>
        <button className="small-btn" onClick={() => changeBet(10)}>
          +10
        </button>
        <button className="small-btn" onClick={() => changeBet(100)}>
          +100
        </button>
        <button className="small-btn" onClick={() => changeBet(-bet / 2)}>
          1/2
        </button>
        <button className="small-btn" onClick={() => changeBet(bet)}>
          2X
        </button>
        <button
          className="small-btn"
          onClick={() => changeBet(balance > 250 ? 250 : balance)}
        >
          MAX
        </button>
      </div>
    </div>
  );
};

export default Betting;
