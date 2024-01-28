import { configureStore } from '@reduxjs/toolkit';
import session from './reducer/session';

const store = configureStore({
  reducer: {
    session,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const makeStore = () => configureStore({
    reducer: {
      session,
    },
  });
