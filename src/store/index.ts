import { configureStore } from '@reduxjs/toolkit';
import session from './reducer/session';
import { uiReducer as ui } from './reducer/ui';

const store = configureStore({
  reducer: {
    session,
    ui
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const makeStore = () => configureStore({
    reducer: {
      session,
      ui
    },
  });

