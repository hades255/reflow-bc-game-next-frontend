"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import Rolling from "./Rolling";
import RollingHistory from "./RollingHistory";
import Betting from "./Betting";
import BetterTable from "./BetterTable";
import { setModal } from "@/redux/slices/main/modalSlice";
import { getActive } from "@/services/roulette";
import myEcho from "@/hooks/myEcho";

const betters1 = [
  {
    user_id: 1,
    name: "Zack",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 24.84,
  },
  {
    user_id: 2,
    name: "Paul",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 17.12,
  },
  {
    user_id: 3,
    name: "Steve",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 45.23,
  },
  {
    user_id: 4,
    name: "Richard",
    level: 3,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 16.18,
  },
  {
    user_id: 5,
    name: "Nina",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 50.0,
  },
  {
    user_id: 6,
    name: "Loren",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 12.12,
  },
];

const betters2 = [
  {
    user_id: 7,
    name: "Nick",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 40.84,
  },
  {
    user_id: 8,
    name: "Catherine",
    level: 2,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 17.12,
  },
  {
    user_id: 9,
    name: "Rose",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 45.23,
  },
  {
    user_id: 10,
    name: "Belt",
    level: 3,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 16.18,
  },
  {
    user_id: 11,
    name: "Medussa",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 50.0,
  },
  {
    user_id: 12,
    name: "Morpling",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 12.12,
  },
  {
    user_id: 13,
    name: "Sheredder",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 24.84,
  },
];

const betters3 = [
  {
    user_id: 14,
    name: "Gondar",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 17.12,
  },
  {
    user_id: 15,
    name: "Luna",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 45.23,
  },
  {
    user_id: 16,
    name: "Sven",
    level: 3,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 16.18,
  },
  {
    user_id: 17,
    name: "Tauren",
    level: 1,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 50.0,
  },
  {
    user_id: 18,
    name: "Phoenix",
    level: 2,
    avatar: "/assets/avatar/avatar-1.png",
    bet: 12.12,
  },
];


const RoulettePage = () => {
  const [betted, setBetted] = useState<number[]>([]);

  const [bet, setBet] = useState<number>(0);

  const [second, setSecond] = useState<number>(-1);

  const dispatch = useDispatch();

  const handleBet = (val: number) => {
    if (bet > 0.1) {
      setBetted((prev) => prev.includes(val) ? prev.filter((pv) => pv !== val) : prev.concat([val]));
    } else {
      dispatch(setModal({
        status: true,
        title: "Error",
        content: "The minimum bet amount is 0.1",
        name: "Steam Sign In",
        type: 3,
        parameter: ""
      }))
    }
  };

  useEffect(() => {
    (async () => {
      let { data, status } = await getActive();
      if (status === 200) {
        let sec = Math.floor(moment().diff(moment.utc(data.created_at).local())/1000);
        if (sec < 15) {
          setSecond(15 - sec);
        } else {
          setSecond(-1);
        }
      }
    })();
  }, []);

  useEffect(() => {
    myEcho();
    const channel = window.Echo.channel("Roulette");
    channel.listen(".GameUpdate", (data: any) => { 
      console.log(data)
    });
    channel.listen(".UpdateBet", (data: any) => { 
      console.log(data)
    });
    return () => {
      channel.stopListening("GameUpdate");
      channel.stopListening("UpdateBet");
    };
  }, [])
  
  return (
    <>
      <Rolling second={second} setSecond={setSecond} />
      <RollingHistory />
      <Betting bet={bet} setBet={setBet} />
      <div className="w-full grid grid-cols-3 gap-12 mt-8 px-6">
        <BetterTable
          type={1}
          betters={betters1}
          bet={handleBet}
          betted={betted}
          amount={bet}
        />
        <BetterTable
          type={3}
          betters={betters3}
          bet={handleBet}
          betted={betted}
          amount={bet}
        />
        <BetterTable
          type={2}
          betters={betters2}
          bet={handleBet}
          betted={betted}
          amount={bet}
        />
      </div>
    </>
  );
};

export default RoulettePage;
