import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { pageSlice } from "./slices/main/pageSlice";
import { authSlice } from "./slices/main/authSlice";
import { userSlice } from "./slices/main/userSlice";
import { modalSlice } from "./slices/main/modalSlice";
import { toastSlice } from "./slices/main/toastSlice";
import { myGamesSlice } from "./slices/coinflip/myGamesSlice";
import { liveGamesSlice } from "./slices/coinflip/liveGamesSlice";
import { winningSlice } from "./slices/roulette/winningSlice";
import { latestWinningSlice } from "./slices/roulette/latestWinningSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  page: pageSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  modal: modalSlice.reducer,
  toast: toastSlice.reducer,
  myGames: myGamesSlice.reducer,
  liveGames: liveGamesSlice.reducer,
  winning: winningSlice.reducer,
  latestWinning: latestWinningSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
