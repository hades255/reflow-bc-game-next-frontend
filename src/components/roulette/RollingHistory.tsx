"use client";
import Image from "next/image";

const prevs = [1, 2, 2, 1, 1, 1, 2, 3, 1, 1];

const RollingHistory = () => {
  return (
    <div className="my-8 flex gap-4 justify-center">
      <div className="flex gap-2">
        <span className="text-font">Previous Rolls</span>
        <div className="flex gap-1">
          {prevs.map((prev, id) => (
            <Image
              key={`coinhistory-${id}`}
              width={24}
              height={24}
              src={`/assets/roulette/${
                prev === 1 ? "red.png" : prev === 2 ? "black.png" : "gold.png"
              }`}
              alt=""
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 text-font">
        <span>Last 100</span>
        <span className="flex gap-1">
          <Image
            width={24}
            height={24}
            src={"/assets/roulette/red.png"}
            alt=""
          />
          <span>56</span>
        </span>
        <span className="flex gap-1">
          <Image
            width={24}
            height={24}
            src={"/assets/roulette/gold.png"}
            alt=""
          />
          <span>8</span>
        </span>
        <span className="flex gap-1">
          <Image
            width={24}
            height={24}
            src={"/assets/roulette/black.png"}
            alt=""
          />
          <span>36</span>
        </span>
      </div>
    </div>
  );
};

export default RollingHistory;
