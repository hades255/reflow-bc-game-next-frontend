export type UserType = {
  id: number;
  steam_id: string;
  name: string;
  role: string;
  avatar: string;
  player_level: string;
  deleted: boolean | null
  two_step: boolean;
}

export type PlayerType = {
  user_id: number;
  name: string;
  avatar: string;
  level: number;
  side: boolean;
  budget: number;
}

export type GameType = {
  id: string;
  game_id: string;
  round: string | null;
  privateSeedHash: string;
  players: PlayerType[];
  side: boolean | null;
  bet: number;
}

export type HistoryType = {
  id: string;
  game_id: string;
  round: string | null;
  publicSeed: string;
  serverSeed: string;
  players: PlayerType[];
  side: boolean | null;
  bet: number;
}