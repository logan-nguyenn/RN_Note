import { combineReducers } from 'redux';
import tasksReducer, { TasksState } from './tasks';

export interface RootState {
  tasks: TasksState;
}

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;