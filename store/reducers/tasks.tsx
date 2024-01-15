import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToDo } from '../../src/screens/HomeScreen';

export type TasksState = IToDo[];

const initialState: TasksState = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<IToDo>) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    addTask: (state, action: PayloadAction<IToDo>) => {
      console.log(action.payload);
      state.push(action.payload);
    },
    else: (state) => {
      console.log(state)
      return state;
    }
    // Other reducers...
  },
});

export const { deleteTask, updateTask, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;