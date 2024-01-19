import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './slices';
import { persistStore } from 'redux-persist';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);