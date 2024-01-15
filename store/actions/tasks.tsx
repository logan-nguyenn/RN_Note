import { IToDo } from '../../src/screens/HomeScreen';
import { ADD_TASK, DELETE_TASK, UPDATE_TASK } from '../types';

// Action creator for deleting a task
export const deleteTask = (id: string) => ({
    type: DELETE_TASK,
    payload: { id },
});

// Action creator for updating a task
export const updateTask = (task: IToDo) => ({
    type: UPDATE_TASK,
    payload: task,
});

export const addTask = (task: IToDo) => ({
    type: ADD_TASK,
    payload: task,
});


const tasksAction = {
    deleteTask,
    updateTask,
    addTask,
};

export default tasksAction;