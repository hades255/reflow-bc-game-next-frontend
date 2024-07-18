import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/services/useUserInfo";
import { setUser, useUser } from "@/redux/slices/main/userSlice";
import { usePage } from "@/redux/slices/main/pageSlice";
import { changePage } from "@/redux/slices/main/pageSlice";
import Button from "@/components/buttons/Button";
import NormalButton from "@/components/buttons/NormalButton";
import NavButton from "@/components/buttons/NavButton";
import UserCard from "./UserCard";
import { PiCoinsLight } from "react-icons/pi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { signout } from "@/redux/slices/main/authSlice";

const UserArea = () => {

  const router = useRouter();

  const page = usePage();

  const dispatch = useDispatch();

  const gotoDeposit = () => {
    dispatch(changePage("/deposit"));
    router.push("/deposit");
  }

  const gotoWithdraw = () => {
    dispatch(changePage("/withdraw"));
    router.push("/withdraw");
  }

  const user = useUserInfo();

  const mine = useUser();

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  const handleSignOut = useCallback(() => {
    dispatch(setUser(null));
    dispatch(signout());
  }, [dispatch]);

  return (
    <>
      <NormalButton text={"Withdraw"} clicked={gotoWithdraw} active={page === "/withdraw"} />
      <Button text={"Deposit"} disabled={false} clicked={gotoDeposit} active={page === "/deposit"} />
      <NavButton
        Icon={PiCoinsLight}
        text={mine?.balance}
        active={false}
        other={true}
        counter={true}
        start={Number(mine?.prev_balance)}
        end={Number(mine?.balance)}
      />
      {mine && (
        <UserCard
          avatar={mine.avatar}
          name={mine.name}
          lvl={Number(mine.player_level)}
          progress={30}
          active={page === "/profile"}
        />
      )}
      <div className="flex justify-center align-middle">
        <span className="hover:cursor-pointer pt-2 text-[#a0a0aa]" onClick={handleSignOut}>
          <RiLogoutBoxRLine />
        </span>
      </div>
    </>
  );
};

export default UserArea;
