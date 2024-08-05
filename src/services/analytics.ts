import IconRoulette from "@/utils/icons/Roulette";
import IconCoinFlip from "@/utils/icons/CoinFlip";
import IconCrown from "@/utils/icons/Crown";
import IconDuel from "@/utils/icons/Duel";

export const getBalances = [
  { name: "Ethereum", token: "ETH", balance: 26788.55 },
  { name: "BSC", token: "BNB", balance: 26788.55 },
  { name: "BSC", token: "BUSD", balance: 0.512 },
  { name: "Polygon", token: "MATIC", balance: 205.67 },
  { name: "Polygon", token: "USDC", balance: 0.4808 },
  { name: "Arbitrum", token: "ETH", balance: 3.7 },
  { name: "Arbitrum", token: "USDC", balance: 21.54 },
  { name: "ZkSync", token: "STH", balance: 0.2465 },
  { name: "ZkSync", token: "USDC", balance: 0.05816 },
  { name: "Optimism", token: "ETH", balance: 0.08517 },
  { name: "Optimism", token: "USDT", balance: 0.05816 },
  { name: "Ethereum", token: "ETH", balance: 26788.55 },
];

export const getProfits = [
  {
    name: "Roulette",
    icon: IconRoulette,
    volume: 4560,
    monthProfits: 1002,
    totalProfits: 4122,
  },
  {
    name: "Royal Flip",
    icon: IconCoinFlip,
    volume: 1462,
    monthProfits: 1200,
    totalProfits: 6600,
  },
  {
    name: "Crown & King",
    icon: IconCrown,
    volume: 2320,
    monthProfits: 1180,
    totalProfits: 1180,
  },
  {
    name: "Prediction Market",
    icon: IconDuel,
    volume: 3481,
    monthProfits: 1001,
    totalProfits: 1642,
  },
]