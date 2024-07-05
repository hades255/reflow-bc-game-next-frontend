export type UserType = {
  user_id: number;
  name: string;
  avatar: string;
  level: number;
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
  game_id: string;
  players: PlayerType[];
  side: boolean | null;
  bet: number | null;
}