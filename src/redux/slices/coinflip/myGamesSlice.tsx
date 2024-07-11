import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getNewGames } from "@/services/coinflip";
import { showJoinedGame } from "@/services/coinflip";
import { RootState } from "../../store";
import { GameType } from "@/utils/types";

const mygames: GameType[] = [];

const initialState = {
  mygames,
};

export const myGamesSlice = createSlice({
  name: "myGames",
  initialState,
  reducers: {
    setMyGames: (
      state,
      action: PayloadAction<{
        user: any;
        side: boolean;
        bet: number;
        count: number;
        data: any;
      }>
    ) => {
      state.mygames = getNewGames(
        state.mygames,
        action.payload.user,
        action.payload.side,
        action.payload.bet,
        action.payload.count,
        action.payload.data
      );
    },
    setAMyGame: (
      state,
      action: PayloadAction<{ round: string | null; game: GameType }>
    ) => {
      state.mygames = state.mygames.map((gm) =>
        gm.round === action.payload.round
          ? showJoinedGame(gm, action.payload.game)
          : gm
      );
    },
    callHouse: (
      state,
      action: PayloadAction<{ round: string | null, side: boolean }>
    ) => {
      state.mygames = state.mygames.map((gm) =>
        gm.round === action.payload.round
          ? {
              ...gm,
              players: [
                { ...gm.players[0] },
                {
                  user_id: 1,
                  name: "house",
                  avatar: "/assets/images/logo.svg",
                  level: 0,
                  side: !gm.players[0].side,
                  budget: gm.players[0].budget,
                },
              ],
              side: action.payload.side
            }
          : gm
      );
    },
    updateAMyGame: (
      state,
      action: PayloadAction<{ round: string | null; game: GameType }>
    ) => {
      state.mygames = state.mygames.map((gm) =>
        gm.round === action.payload.round ? action.payload.game : gm
      );
    },
    updateBudget: (
      state,
      action: PayloadAction<{ round: string | null }>
    ) => {
      state.mygames = state.mygames.map((game) =>
        game.round === action.payload.round
          ? {
              ...game,
              players: game.players.map((player) => ({
                ...player,
                budget:
                  player.side === game.side
                    ? player.budget * 1.99
                    : -player.budget,
              })),
            }
          : game
      );
    },
    dismissAllGames: (state) => {
      state.mygames = state.mygames.filter((game) => game.players.length === 2);
    },
    deleteAGame: (state, action: PayloadAction<{ round: string | null }>) => {
      state.mygames = state.mygames.filter(
        (game) => game.round !== action.payload.round
      );
    },
  },
});

export const {
  setMyGames,
  setAMyGame,
  callHouse,
  updateAMyGame,
  updateBudget,
  dismissAllGames,
  deleteAGame,
} = myGamesSlice.actions;

export const useMyGames = () =>
  useSelector((state: RootState) => state.myGames.mygames);

export default myGamesSlice.reducer;
