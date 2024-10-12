import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { showNewGames, showJoinedGame, getPlayers } from "@/services/coinflip";
import { RootState } from "../../store";
import { GameType } from "@/utils/types";

const livegames: GameType[] = [];
const selectedlivegames:GameType[] = [];

const initialState = {
  livegames,
  selectedlivegames,
};

export const liveGamesSlice = createSlice({
  name: "liveGames",
  initialState,
  reducers: {
    initialLiveGames: (state, action: PayloadAction<GameType[]>) => {
      state.livegames = action.payload;
    },
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
              serverSeed: action.payload.data?.serverSeed ?? "",
              publicSeed: action.payload.data?.publicSeed ?? "",
              privateSeedHash: action.payload.data?.privateSeedHash ?? "",
              round: action.payload?.round,
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
              players: game.players.map((player, index) => ({
                ...player,
                budget: game.side
                  ? index == 0
                    ? game.players[1].name === "house"
                      ? player.budget * 2
                      : player.budget * 1.98
                    : -player.budget
                  : index == 1
                  ? game.players[1].name === "house"
                    ? player.budget * 2
                    : player.budget * 1.98
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
    deleteALiveGameById: (
      state,
      action: PayloadAction<{ id: string | null }>
    ) => {
      state.livegames = state.livegames.map((game) =>
        game.game_id === action.payload.id ? { ...game, round: null } : game
      );
    },
    cacheDelete: (state) => {
      state.livegames = state.livegames.filter((game) => game.round !== null);
    },
    filterAmount: (state, action: PayloadAction<{ condition: number[] }>) => {
      state.selectedlivegames =
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
      state.selectedlivegames = action.payload.sort
        ? state.selectedlivegames.sort((a, b) => b.bet - a.bet)
        : state.selectedlivegames.sort((a, b) => a.bet - b.bet);
    },
  },
});

export const {
  initialLiveGames,
  setLiveGames,
  setALiveGame,
  updateALiveGame,
  playAGame,
  addLiveGames,
  deleteALiveGame,
  deleteALiveGameById,
  cacheDelete,
  updateBudget,
  filterAmount,
  sortAmount,
} = liveGamesSlice.actions;

export const useLiveGames = () =>
  useSelector((state: RootState) => state.liveGames.livegames);
export const useSelectedLiveGames = () =>
  useSelector((state: RootState) => state.liveGames.selectedlivegames);

export default liveGamesSlice.reducer;
