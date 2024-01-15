import { combineReducers } from 'redux';
import tasksReducer, { TasksState } from './tasks';

export interface RootState {
  tasks: TasksState; // Ensure that TasksState is correctly defined and imported
}

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;