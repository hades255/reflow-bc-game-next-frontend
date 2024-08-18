export type UserType = {
  id: number;
  steam_id: string;
  name: string;
  role: string;
  avatar: string;
  player_level: string;
  is_admin: boolean;
  is_whitelist: boolean;
  experience: Number;
  totalBet: Number;
  rank: Number;
  deleted: boolean | null;
  two_step: boolean;
};

export type PlayerType = {
  user_id: number;
  name: string;
  avatar: string;
  level: number;
  side: boolean;
  budget: number;
};

export type GameType = {
  id: string;
  game_id: string;
  round: string | null;
  privateSeedHash: string;
  players: PlayerType[];
  side: boolean | null;
  bet: number;
};

export type HistoryType = {
  id: string;
  game_id: string;
  round: string | null;
  publicSeed: string;
  serverSeed: string;
  players: PlayerType[];
  side: boolean | null;
  bet: number;
};

export type AdminType = {
  id: number;
  name: string;
  avatar: string;
  balance: string;
  experience: string;
  two_step: boolean;
  is_admin: boolean;
}

export type WhitelistType = {
  id: number;
  name: string;
  avatar: string;
  balance: string;
  experience: string;
  two_step: boolean;
  is_whitelist: boolean;
}

export type BonusType = {
  id?: number;
  code?: string;
  name: string;
  reward: number;
  whitelist: boolean;
  limit_level: number;
  limit_usage: number;
  current_usage?: number;
  is_valid?: boolean;
  created_at?: string;
  updated_at?: string;
}