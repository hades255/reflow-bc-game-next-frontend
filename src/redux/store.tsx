import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/main/authSlice';
import { userSlice } from './slices/main/userSlice';
import { myGamesSlice } from './slices/coinflip/myGamesSlice';
import { liveGamesSlice } from './slices/coinflip/liveGamesSlice';
import { modalSlice } from './slices/main/modalSlice';
import { toastSlice } from './slices/main/toastSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    myGames: myGamesSlice.reducer,
    liveGames: liveGamesSlice.reducer,
    modal: modalSlice.reducer,
    toast: toastSlice.reducer
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;