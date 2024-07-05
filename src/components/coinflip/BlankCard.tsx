import Image from "next/image";

const BlankCard = () => {
  return (
    <div className="h-48 w-[300px] rounded-md bg-[#1E1E1E] game-card p-3 flex justify-between items-center relative">
      <div className="h-full w-full rounded-md innerBlack bg-[#191919] flex justify-center items-center">
        <Image
          width={104}
          height={81}
          src={"/assets/images/Crown.png"}
          alt=""
        />
      </div>
    </div>
  );
};

export default BlankCard;
