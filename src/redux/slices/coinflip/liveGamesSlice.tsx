import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { showNewGames, showJoinedGame, getPlayers } from "@/services/coinflip";
import { RootState } from "../../store";
import { GameType } from "@/utils/types";

const livegames: GameType[] = [];

const initialState = {
  livegames,
};

export const liveGamesSlice = createSlice({
  name: "liveGames",
  initialState,
  reducers: {
    setLiveGames: (
      state,
      action: PayloadAction<{ games: GameType[]; count: number }>
    ) => {
      state.livegames = showNewGames(
        state.livegames,
        action.payload.games,
        action.payload.count
      );
    },
    setALiveGame: (
      state,
      action: PayloadAction<{ round: string | null; game: GameType }>
    ) => {
      state.livegames = state.livegames.map((gm) =>
        gm.round === action.payload.round
          ? showJoinedGame(gm, action.payload.game)
          : gm
      );
    },
    updateALiveGame: (
      state,
      action: PayloadAction<{ round: string | null; game: GameType }>
    ) => {
      state.livegames = state.livegames.map((gm) =>
        gm.round === action.payload.round ? action.payload.game : gm
      );
    },
    playAGame: (
      state,
      action: PayloadAction<{ round: string | null; data: any }>
    ) => {
      state.livegames = state.livegames.map((live) =>
        live.round === action.payload.round
          ? {
              ...live,
              side: action.payload.data.winner,
              players: getPlayers(action.payload.data),
            }
          : live
      );
    },
    addLiveGames: (state, action: PayloadAction<GameType>) => {
      state.livegames.push(action.payload);
    },
    updateBudget: (state, action: PayloadAction<{ round: string | null }>) => {
      state.livegames = state.livegames.map((game) =>
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
    deleteALiveGame: (
      state,
      action: PayloadAction<{ round: string | null }>
    ) => {
      state.livegames = state.livegames.map((game) =>
        game.round === action.payload.round ? { ...game, round: null } : game
      );
    },
    cacheDelete: (state) => {
      state.livegames = state.livegames.filter((game) => game.round !== null);
    },
    filterAmount: (state, action: PayloadAction<{ condition: number[] }>) => {
      state.livegames =
        action.payload.condition[1] === -1
          ? state.livegames.filter(
              (game) => game.bet && game.bet > action.payload.condition[0]
            )
          : state.livegames.filter(
              (game) =>
                game.bet &&
                action.payload.condition[1] >= game.bet &&
                game.bet > action.payload.condition[0]
            );
    },
    sortAmount: (state, action: PayloadAction<{ sort: boolean }>) => {
      state.livegames = action.payload.sort
        ? state.livegames.sort((a, b) => b.bet - a.bet)
        : state.livegames.sort((a, b) => b.bet - a.bet);
    },
  },
});

export const {
  setLiveGames,
  setALiveGame,
  updateALiveGame,
  playAGame,
  addLiveGames,
  deleteALiveGame,
  cacheDelete,
  updateBudget,
  filterAmount,
  sortAmount
} = liveGamesSlice.actions;

export const useLiveGames = () =>
  useSelector((state: RootState) => state.liveGames.livegames);

export default liveGamesSlice.reducer;
