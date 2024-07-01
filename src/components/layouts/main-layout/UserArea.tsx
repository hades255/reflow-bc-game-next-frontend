import UserCard from "./UserCard";
import Button from "@/components/buttons/Button";
import NormalButton from "@/components/buttons/NormalButton";
import NavButton from "@/components/buttons/NavButton";
import { PiCoinsLight } from "react-icons/pi";

const UserArea = () => {
  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <div className="flex gap-4">
      <NormalButton icon={<></>} text={"Withdraw"} clicked={handleClick} />
      <Button text={"Deposit"} disabled={false} clicked={handleClick} />
      <NavButton
        Icon={PiCoinsLight}
        text={"24.86"}
        clicked={handleClick}
        active={false}
        other={true}
      />
      <UserCard
        avatar={"/assets/images/default.png"}
        name={"Zakc"}
        lvl={54}
        progress={30}
      />
    </div>
  );
};

export default UserArea;
