import { combineReducers } from 'redux';
import tasksReducer, { TasksState } from './tasks';
import authReducer, { AuthState } from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

export interface RootState {
  tasks: TasksState;
  auth: AuthState;
}

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
 };

const rootReducer = combineReducers({
  tasks: tasksReducer,
  auth: persistReducer(rootPersistConfig, authReducer),
});
export default persistReducer(rootPersistConfig, rootReducer);