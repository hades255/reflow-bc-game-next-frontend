import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  avatar: string;
  name: string;
  lvl: number;
  progress: number;
}

const UserCard: React.FC<Props> = ({ avatar, name, lvl, progress }) => {
  const router = useRouter();

  const handleClickUserArea = useCallback(() => {
    router.push("/profile/details");
  }, [router]);

  return (
    <div
      className="h-full flex rounded-sm relative hover:cursor-pointer"
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
        style={{ width: `${progress}%` }}
        className="absolute h-[3px] bg-[#5BFFBA] rounded-b-sm bottom-0 left-0"
      ></div>
    </div>
  );
};

export default UserCard;
