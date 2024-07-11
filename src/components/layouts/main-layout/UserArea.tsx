import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserInfo } from "@/services/useUserInfo";
import { setUser, useUser } from "@/redux/slices/main/userSlice";
import Button from "@/components/buttons/Button";
import NormalButton from "@/components/buttons/NormalButton";
import NavButton from "@/components/buttons/NavButton";
import UserCard from "./UserCard";
import { PiCoinsLight } from "react-icons/pi";

const UserArea = () => {

  const handleClick = () => {
    console.log("Clicked");
  };  

  const user = useUserInfo();

  const mine = useUser();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  return (
    <div className="flex gap-4">
      <NormalButton icon={<></>} text={"Withdraw"} clicked={handleClick} />
      <Button text={"Deposit"} disabled={false} clicked={handleClick} />
      <NavButton
        Icon={PiCoinsLight}
        text={mine?.balance}
        clicked={handleClick}
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
        />
      )}
    </div>
  );
};

export default UserArea;
