import Rolling from "./Rolling";
import RollingHistory from "./RollingHistory";
import Betting from "./Betting";
import BetterTable from "./BetterTable";
import DailyTable from "./DailyTable";

const betters1 = [
  { user_id: 1, name: "Zack", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 24.84 },
  { user_id: 2, name: "Paul", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 17.12 },
  { user_id: 3, name: "Steve", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 45.23 },
  { user_id: 4, name: "Richard", level: 3, avatar: "/assets/avatar/avatar-1.png", bet: 16.18 },
  { user_id: 5, name: "Nina", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 50.00 },
  { user_id: 6, name: "Loren", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 12.12 },
]

const betters2 = [
  { user_id: 7, name: "Nick", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 40.84 },
  { user_id: 8, name: "Catherine", level: 2, avatar: "/assets/avatar/avatar-1.png", bet: 17.12 },
  { user_id: 9, name: "Rose", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 45.23 },
  { user_id: 10, name: "Belt", level: 3, avatar: "/assets/avatar/avatar-1.png", bet: 16.18 },
  { user_id: 11, name: "Medussa", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 50.00 },
  { user_id: 12, name: "Morpling", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 12.12 },
  { user_id: 13, name: "Sheredder", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 24.84 },
]

const betters3 = [
  { user_id: 14, name: "Gondar", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 17.12 },
  { user_id: 15, name: "Luna", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 45.23 },
  { user_id: 16, name: "Sven", level: 3, avatar: "/assets/avatar/avatar-1.png", bet: 16.18 },
  { user_id: 17, name: "Tauren", level: 1, avatar: "/assets/avatar/avatar-1.png", bet: 50.00 },
  { user_id: 18, name: "Phoenix", level: 2, avatar: "/assets/avatar/avatar-1.png", bet: 12.12 },
]

const dailyList = [
  { id: 1, name: "Loren", avatar: "/assets/avatar/avatar-1.png", wagered: 35000, prize: 3000 },
  { id: 2, name: "Rovert", avatar: "/assets/avatar/avatar-1.png", wagered: 30000, prize: 1500 },
  { id: 3, name: "Coline", avatar: "/assets/avatar/avatar-1.png", wagered: 32000, prize: 1000 },
  { id: 4, name: "Nicole", avatar: "/assets/avatar/avatar-1.png", wagered: 15000, prize: 500 },
  { id: 5, name: "Bell", avatar: "/assets/avatar/avatar-1.png", wagered: 10000, prize: 300 },
  { id: 6, name: "Jessica", avatar: "/assets/avatar/avatar-1.png", wagered: 9000, prize: 200 }
]

const RoulettePage = () => {
  return (
    <>
      <Rolling />
      <RollingHistory />
      <Betting />
      <div className="w-full grid grid-cols-3 gap-12 mt-8 px-6">
        <BetterTable type={1} betters={betters1} />
        <BetterTable type={3} betters={betters3} />
        <BetterTable type={2} betters={betters2} />
      </div>
      <DailyTable list={dailyList} />
    </>
  )
}

export default RoulettePage