import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;