"use client";
import Header from "@/components/coinflip/Header";
import MyGames from "@/components/coinflip/MyGames";
import LiveGames from "@/components/coinflip/LiveGames";


const CoinFlip = () => {

  return (
    <div className="w-full h-full p-6">
      <Header />
      <MyGames />
      <LiveGames />
    </div>
  );
};

export default CoinFlip;
