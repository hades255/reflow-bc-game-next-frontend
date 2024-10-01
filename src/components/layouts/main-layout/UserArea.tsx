import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/main";
import { setUser, useUser } from "@/redux/slices/main/userSlice";
import { useBalance, setBalance } from "@/redux/slices/main/balanceSlice";
import { usePage, changePage } from "@/redux/slices/main/pageSlice";
import Button from "@/components/buttons/Button";
import NormalButton from "@/components/buttons/NormalButton";
import NavButton from "@/components/buttons/NavButton";
import UserCard from "./UserCard";
import { PiCoinsLight } from "react-icons/pi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { signout } from "@/redux/slices/main/authSlice";
import { XP_SYSTEM } from "@/config/constants";
import { setModal } from "@/redux/slices/main/modalSlice";

const UserArea = () => {
  const router = useRouter();
  const page = usePage();
  const balance = useBalance();
  const user = useUser();
  const dispatch = useDispatch();

  const gotoDeposit = () => {
    dispatch(changePage("/deposit"));
    router.push("/deposit");
  };

  const gotoWithdraw = () => {
    if (!user?.is_whitelist) {
      dispatch(
        setModal({
          status: true,
          title: "You are not whitelisted",
          content: "Please contact support team",
          name: "Steam Sign In",
          type: 3,
          parameter: `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`,
        })
      );
    } else {
      dispatch(changePage("/withdraw"));
      router.push("/withdraw");
    }
  };

  useEffect(() => {
    (async () => {
      let { data, status } = await getUserInfo();
      if (status === 200) {
        dispatch(setUser(data));
        dispatch(
          setBalance({
            balance: Number(data.balance),
          })
        );
      }
    })();
  }, [dispatch]);

  const handleSignOut = useCallback(() => {
    dispatch(setUser(null));
    dispatch(setBalance({ balance: 0 }));
    dispatch(signout());
  }, [dispatch]);

  return (
    <>
      <NormalButton
        text={"Withdraw"}
        clicked={gotoWithdraw}
        active={page === "/withdraw"}
      />
      <Button
        text={"Deposit"}
        disabled={false}
        clicked={gotoDeposit}
        active={page === "/deposit"}
      />
      <NavButton
        Icon={PiCoinsLight}
        text={balance.balance}
        active={false}
        other={true}
        counter={true}
        start={Number(balance.prev_balance)}
        end={Number(balance.balance)}
      />
      {user && (
        <>
          <UserCard
            id={user.id}
            avatar={user.avatar}
            name={user.name}
            lvl={Number(user.player_level)}
            progress={
              (Number(user.experience) * 100) /
              (XP_SYSTEM[Number(user.player_level)].xp -
                (Number(user.player_level) - 1 >= 0
                  ? XP_SYSTEM[Number(user.player_level) - 1].xp
                  : 0))
            }
            active={page === "/profile"}
          />
        </>
      )}
      <div className="flex justify-center align-middle">
        <span
          className="hover:cursor-pointer pt-2 text-[#a0a0aa] hover:text-[#FFF]"
          onClick={handleSignOut}
        >
          <RiLogoutBoxRLine />
        </span>
      </div>
    </>
  );
};

export default UserArea;
