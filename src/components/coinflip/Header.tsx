"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToken } from "@/redux/slices/main/authSlice";
import { setModal } from "@/redux/slices/main/modalSlice";
import { useUser } from "@/redux/slices/main/userSlice";
import { useBalance, updateBalance } from "@/redux/slices/main/balanceSlice";
import { useMyGames, setMyGames } from "@/redux/slices/coinflip/myGamesSlice";
import { createNewGames } from "@/services/coinflip";
import BlackCoin from "@/utils/icons/BlackCoin";
import WhiteCoin from "@/utils/icons/WhiteCoin";
import Button from "../buttons/Button";
import { PiCoinsLight } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";

const Header = () => {
  const mygames = useMyGames();
  const [isUp, setIsUp] = useState<boolean>(true);
  const [bet, setBet] = useState<number>(0.0);
  const [counts, setCounts] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const token = useToken();
  const balance = useBalance().balance;
  const user = useUser();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value);
    const decimalRegEx = /^\d*\.?\d{0,2}$/;
    if (0.1 <= val && val <= 500) {
        setBet(Number(val.toFixed(2)));
    }
    if (Number.isNaN(val) || val == 0) {
      setBet(0);
    }
  };

  const changeBet = (betted: number) => {
    if (user) {
      let sum = bet + betted;
      if (sum <= balance && sum <= 500) {
        setBet(Number(sum.toFixed(2)));
      } else  {
        if (balance > 500) {
          setBet(500);
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
  }

  const handleCounts = (count: number) => {
    setCounts(count);
  };

  const createMyGames = async (side: boolean, bet: number, count: number) => {
    if (!loading) {
      if (mygames.length < 8) {
        setLoading((prev) => !prev);
        let resCount = mygames.length + count > 8 ? 8 - mygames.length : count;
        let pendingsAmount = mygames.filter((game) => game.players.length === 1).reduce((sum, game) => sum + game.bet, 0);
        if (pendingsAmount + resCount * bet <= 2000) {
          const data = await createNewGames(side, bet, resCount);
          if (data.status === 200) {
            setLoading((prev) => !prev);
            dispatch(updateBalance({ balance: -bet * resCount }));
            dispatch(setMyGames({ user, side, bet, count: resCount, data: data.data.data }));
          } else {
            setLoading((prev) => !prev);
          }
        } else {
          let decrease = async () => {
            resCount -= 1;
            if (pendingsAmount + resCount * bet <= 2000) {
              if (resCount > 0) {
                const data = await createNewGames(side, bet, resCount);
                if (data.status === 200) {
                  setLoading((prev) => !prev);
                  dispatch(updateBalance({ balance: -bet * resCount }));
                  dispatch(setMyGames({ user, side, bet, count: resCount, data: data.data.data }));
                } else {
                  setLoading((prev) => !prev);
                }
              } else {
                setLoading((prev) => !prev);
              }      
              return;
            } else {
              await decrease();
            }
          }
          await decrease();
        }
      } else {
        dispatch(
          setModal({
            status: true,
            title: "Limited to create games",
            content: "Total games are limited to 8.",
            name: "Okay",
            type: 3,
            parameter: ``,
          })
        );
      }
    }
  };

  const handleCreate = () => {
    (async () => {
      if (token === "") {
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
      } else {
        if (bet * counts <= Number(balance)) {
          if (bet === 0) {
            dispatch(
              setModal({
                status: true,
                title: "0 betted",
                content: "Please choose the budget over 0",
                name: "Okay",
                type: 3,
                parameter: ``,
              })
            );
          } else {
            await createMyGames(isUp, bet, counts);
          }
        } else {
          dispatch(
            setModal({
              status: true,
              title: "No enough balance",
              content: "Please deposit the money to start playing.",
              name: "Deposit",
              type: 2,
              parameter: ``,
            })
          );
        }
      }
    })();
  };

  return (
    <div className="w-full h-12 rounded-md innerBlack relative !z-30">
      <div className="shine dropBlack z-0"></div>
      <div className="w-full h-full flex justify-between items-center px-4">
        <span className="font-semibold text-xl text-font">Royal Flip</span>
        <div className="flex gap-4 items-center py-1 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[#d1d1d1]">{"Side:"}</span>
            <button
              className={
                isUp
                  ? "border-[2px] border-white rounded-full small-coin"
                  : "small-coin"
              }
              onClick={() => !isUp && setIsUp((prev) => !prev)}
            >
              <WhiteCoin width={24} height={24} />
            </button>
            <button
              className={
                isUp
                  ? "small-coin"
                  : "border-[2px] border-[#707070] rounded-full small-coin"
              }
              onClick={() => isUp && setIsUp((prev) => !prev)}
            >
              <BlackCoin width={24} height={24} />
            </button>
          </div>
          <div className="flex gap-2 items-center rounded-sm border border-[#252525] text-gold z-10 py-1 px-2">
            <PiCoinsLight />
            <input
              type="number"
              value={bet == undefined || bet == 0 ? "" : bet}
              className="bg-transparent w-24 black-input"
              onChange={handleChange}
            />
            <div className="flex gap-1">
              <button className="small-btn" onClick={() => setBet(0.0)}>
                CLEAR
              </button>
              <button
                className="small-btn"
                onClick={() => changeBet(0.5)}
              >
                +0.5
              </button>
              <button
                className="small-btn"
                onClick={() => changeBet(1)}
              >
                +1
              </button>
              <button
                className="small-btn"
                onClick={() => changeBet(10)}
              >
                +10
              </button>
              <button
                className="small-btn"
                onClick={() => changeBet(100)}
              >
                +100
              </button>
              <button
                className="small-btn"
                onClick={() => changeBet(-bet / 2)}
              >
                1/2
              </button>
              <button
                className="small-btn"
                onClick={() => changeBet(bet)}
              >
                2X
              </button>
              <button className="small-btn" onClick={() => changeBet(balance > 500 ? 500 : balance)}>
                MAX
              </button>
            </div>
          </div>

          <div className="hs-dropdown relative inline-flex !z-30 bg-transparent rounded-sm border border-[#252525]">
            <button
              id="hs-dropdown-default"
              type="button"
              className="py-[6px] px-2 text-[#707070] flex items-center gap-2"
            >
              <span>{counts}x</span>
              <FaChevronDown className="s-dropdown-open:rotate-180" />
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-32 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
              aria-labelledby="hs-dropdown-default"
            >
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => handleCounts(1)}
              >
                1x Game
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => handleCounts(2)}
              >
                2x Games
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => handleCounts(3)}
              >
                3x Games
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => handleCounts(4)}
              >
                4x Games
              </button>
            </div>
          </div>
          <Button
            text={`Create ${counts} game${counts === 1 ? "" : "s"}`}
            disabled={loading}
            clicked={handleCreate}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
