import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToDo } from '../../screens/HomeScreen';
import firestore from '@react-native-firebase/firestore';
import { PURGE } from 'redux-persist';

export type TasksState = IToDo[];

const initialState: TasksState = [];

export const fetchTasks = createAsyncThunk('todos/fetchTodos', async (userId: string) => {
  const snapshot = await firestore().collection('todos').where('userId', '==', userId).get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Omit<IToDo, 'id'>,
  }));
 });

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    deleteTask: (state, action: PayloadAction<string>) => {
      firestore().collection('todos').doc(action.payload).delete();
      return state.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<IToDo>) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        const task = action.payload as IToDo;
        state[index] = task;
        firestore().collection('todos').doc(task.id).set(task);
      }
    },
    addTask: (state, action: PayloadAction<IToDo>) => {
      state.push(action.payload);
      firestore().collection('todos').doc(action.payload.id).set(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { deleteTask, updateTask, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
