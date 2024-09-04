import { fetchAPI } from "./fetchAPI";
import { GameType } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";

export const createNewGames = async (
  side: boolean,
  bet: number,
  count: number
) => {
  const data = await fetchAPI("/api/game/royalflip/create", "POST", {
    betAmount: bet,
    userColor: side,
    games: count,
  });
  return data;
};

export const getPendingGames = async (type: boolean, user?: any) => {
  let data;
  if (user) {
    data = await fetchAPI("/api/game/royalflip/pending", "POST");
  } else {
    data = await fetchAPI("/api/public/games/royalflip/pending", "POST");
  }
  if (type) {
    return data.data.data.my
      .filter((gm: GameType, id: number) => id < 8)
      .map((game: any) => ({
        id: uuidv4(),
        game_id: game.gameId,
        round: game.round,
        privateSeedHash: game.privateSeedHash,
        players: [
          {
            user_id: user.id,
            name: user.name,
            avatar: user.avatar,
            level: Number(user.player_level),
            side: game.userColor,
            budget: Number(game.betAmount),
          },
        ],
        side: null,
        bet: game.betAmount
      }));
  } else {
    return data.data.data.other
      .map((game: any) => ({
        id: uuidv4(),
        game_id: game.gameId,
        round: game.round,
        privateSeedHash: game.privateSeedHash,
        players: [
          {
            user_id: game.userId,
            name: game.userName,
            avatar: game.userAvatar,
            level: Number(game.userLevel),
            side: game.userColor,
            budget: Number(game.betAmount),
          },
        ],
        side: null,
        bet: game.betAmount
      }));
  }
};

export const getNewGames = (
  myGames: GameType[],
  user: any,
  side: boolean,
  bet: number,
  count: number,
  data: any
) => {
  let games = [...myGames];
  let length = games.length;
  if (length + count < 8) {
    [...Array(count)].forEach((ar, id) => {
      games.push({
        id: uuidv4(),
        game_id: data[id]?.gameId,
        round: data[id]?.round,
        privateSeedHash: data[id]?.privateSeedHash,
        serverSeed: data[id]?.serverSeed ?? "",
        publicSeed: data[id]?.publicSeed ?? "",
        players: [
          {
            user_id: user.id,
            name: user.name,
            avatar: user.avatar,
            level: Number(user.player_level),
            side: side,
            budget: Number(bet),
          },
        ],
        side: null,
        bet: bet,
      });
    });
  } else {
    [...Array(8 - length)].forEach((ar, id) => {
      games.push({
        id: uuidv4(),
        game_id: data[id]?.gameId,
        round: data[id]?.round,
        privateSeedHash: data[id]?.privateSeedHash,
        serverSeed: data[id]?.serverSeed ?? "",
        publicSeed: data[id]?.publicSeed ?? "",
        players: [
          {
            user_id: user.id,
            name: user.name,
            avatar: user.avatar,
            level: Number(user.player_level),
            side: side,
            budget: Number(bet),
          },
        ],
        side: null,
        bet: bet,
      });
    });
    games
      .filter((game) => game.round === null)
      .forEach((game, idx) => {
        if (idx < length + count - 8) {
          games.forEach((gm, idy) => {
            if (gm.id === game.id) {
              games[idy] = {
                id: uuidv4(),
                game_id: data[8 - length + idx]?.gameId,
                round: data[8 - length + idx]?.round,
                privateSeedHash: data[8 - length + idx]?.privateSeedHash,
                serverSeed: data[8 - length + idx]?.serverSeed ?? "",
                publicSeed: data[8 - length + idx]?.publicSeed ?? "",
                players: [
                  {
                    user_id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    level: Number(user.player_level),
                    side: side,
                    budget: Number(bet),
                  },
                ],
                side: null,
                bet: bet,
              };
            }
          });
        }
      });
  }
  return [...games];
};

export const getHistory = async (user: any) => {
  const data = await fetchAPI("/api/game/royalflip/mygame", "POST", {
    perPage: 20,
    page: 1,
    sort: "ASC",
  });

  return {
    total: data.data.data.total,
    data: data.data.data.items.map((game: any) => ({
      id: uuidv4(),
      game_id: game.id,
      round: game.round,
      publicSeed: game.public_seed,
      serverSeed: game.server_seed,
      privateSeedHash: game.server_seed_hash,
      players: [
        {
          user_id: user.id,
          name: user.name,
          avatar: user.avatar,
          level: user.player_level,
          side: game.user_color,
          budget: game.competitor.id == 1 ? (game.winner ? game.bet_amount * 2 : -game.bet_amount) :  (game.winner ? game.bet_amount * 1.99 : -game.bet_amount),
        },
        {
          user_id: game.competitor.id,
          name: game.competitor.name,
          avatar:
            game.competitor.avatar === "house"
              ? "/assets/images/crown.svg"
              : game.competitor.avatar,
          level: game.competitor.player_level,
          side: !game.user_color,
          budget: game.competitor.id == 1 ? ( !game.winner ? game.bet_amount * 2 : -game.bet_amount): (!game.winner ? game.bet_amount * 1.99 : -game.bet_amount),
        },
      ],
      side: game.winner,
      bet: game.bet_amount,
    })),
  };
};

export const joinGame = async (gameId: number) => {
  const data = await fetchAPI("/api/game/royalflip/join", "POST", {
    gameId,
  });
  return data;
};

export const cancelGames = async (gameId: number[]) => {
  const data = await fetchAPI("/api/game/royalflip/cancel", "POST", {
    gameId,
  });
  return data;
};

export const showNewGames = (game: any, data: GameType[], count: number) => {
  if (game.length + data.length <= count) {
    let newd = data.map((gm: any) => {
      return {
        id: uuidv4(),
        game_id: gm.gameId,
        round: gm.round,
        privateSeedHash: gm.privateSeedHash,
        players: [
          {
            user_id: gm.userId,
            name: gm.userName,
            avatar: gm.userAvatar,
            level: gm.userLevel,
            side: gm.userColor,
            budget: Number(gm.betAmount),
          },
        ],
        side: null,
        bet: gm.betAmount,
      };
    });
    return game.concat(newd);
  } else {
    data.forEach((gm: any) => {
      game.forEach((pv: any, idx: number) => {
        if (pv === null) {
          game[idx] = {
            id: uuidv4(),
            game_id: gm.gameId,
            round: gm.round,
            privateSeedHash: gm.privateSeedHash,
            players: [
              {
                user_id: gm.userId,
                name: gm.userName,
                avatar: gm.userAvatar,
                level: gm.userLevel,
                side: gm.userColor,
                budget: Number(gm.betAmount),
              },
            ],
            side: null,
            bet: gm.betAmount,
          };
        }
      });
    });
    return game;
  }
};

export const showJoinedGame = (game: GameType, data: any) => {
  let newd = { ...data };
  let gm = { ...game };
  return {
    ...gm,
    players: [
      { ...gm["players"][0], side: newd.userColor },
      {
        user_id: newd.competitorId,
        name: newd.competitorName,
        avatar:
          newd.competitorAvatar === "house"
            ? "/assets/images/crown.svg"
            : newd.competitorAvatar,
        level: newd.competitorLevel,
        side: !newd.userColor,
        budget: Number(newd.betAmount),
      },
    ],
    serverSeed: newd?.serverSeed ?? "",
    publicSeed: newd?.publicSeed ?? "",
    privateSeedHash: newd?.privateSeedHash ?? "",
    round: newd?.round,
    side: newd.winner,
    bet: newd.betAmount,
  };
};

export const getPlayers = (data: any) => {
  return [
    {
      user_id: data.userId,
      name: data.userName,
      avatar: data.userAvatar,
      level: data.userLevel,
      side: data.userColor,
      budget: Number(data.betAmount),
    },
    {
      user_id: data.competitorId,
      name: data.competitorName,
      avatar: data.competitorAvatar,
      level: data.competitorLevel,
      side: !data.userColor,
      budget: Number(data.betAmount),
    },
  ];
};
