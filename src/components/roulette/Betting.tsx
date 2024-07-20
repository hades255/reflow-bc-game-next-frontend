import { FC } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/slices/main/modalSlice";
import { useUser } from "@/redux/slices/main/userSlice";
import { PiCoinsLight } from "react-icons/pi";

interface Props {
  bet: number;
  setBet: (val: number) => void;
}

const Betting: FC<Props> = ({ bet, setBet}) => {

  const user = useUser();

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBet(parseFloat(e.target.value));
  };

  const changeBet = (betted: number) => {
    if (user) {
      if (bet + betted <= Number(user.balance)) {
        setBet(bet + betted);
      } else {
        setBet(Number(user.balance));
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
          value={bet}
          className="bg-transparent w-24 black-input"
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-1">
        <button className="small-btn" onClick={() => setBet(0.0)}>
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
          onClick={() => changeBet(Number(user?.balance))}
        >
          MAX
        </button>
      </div>
    </div>
  );
};

export default Betting;
