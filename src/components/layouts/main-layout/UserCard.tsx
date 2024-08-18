import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { changePage } from "@/redux/slices/main/pageSlice";
import myEcho from "@/hooks/myEcho";
import { setUser } from "@/redux/slices/main/userSlice";

interface Props {
  id: any;
  avatar: string;
  name: string;
  lvl: number;
  progress: number;
  active?: boolean;
}

const UserCard: React.FC<Props> = ({
  id,
  avatar,
  name,
  lvl,
  progress,
  active,
}) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleClickUserArea = useCallback(() => {
    router.push("/profile/details");
    dispatch(changePage("/profile"));
  }, [dispatch, router]);

  useEffect(() => {
    myEcho();
    const channel = window.Echo.channel("UpdateUser." + id);
    channel.listen("UpdateUser", (e: any) => {
      dispatch(setUser(e.user));
    });
    return () => {
      channel.stopListening("UpdateUser");
    };
  }, [id, dispatch]);

  return (
    <div
      className={`h-full flex rounded-sm relative cursor-pointer btn-hover ${
        active ? "btn-active" : ""
      }`}
      onClick={handleClickUserArea}
    >
      <div className="p-2 flex min-w-24 items-center gap-2 rounded-l-sm normal-btn">
        <Image
          className="rounded-sm"
          width={18}
          height={18}
          alt=""
          src={avatar}
        />
        <span className="text-sm font-semibold text-[#9c9c9c] mr-4">
          {name}
        </span>
      </div>
      <div className="bg-gold rounded-r-sm py-1 px-2 flex items-center gold-btn-inner">
        <p className="text-black text-sm font-semibold flex">
          <span>{lvl}</span>
          <span>&nbsp;Lvl.</span>
        </p>
      </div>
      <div className="absolute w-full h-[3px] bg-[rgba(0,0,0,.9)] rounded-b-sm bottom-0"></div>
      <div
        style={{
          width: `${progress}%`,
        }}
        className="absolute h-[3px] bg-[#5BFFBA] rounded-b-sm bottom-0 left-0"
      ></div>
    </div>
  );
};

export default UserCard;
