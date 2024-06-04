import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

import { Todo } from '../types';

export type TodosState = {
  todos: Todo[];
};

export const initialState: TodosState = {
  todos: [
    {
      id: uuidv4(),
      task: 'Create my first task',
      done: false,
    },
    {
      id: uuidv4(),
      task: 'Mark task as done',
      done: false,
    },
  ],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action) => {
      state.todos.push({
        id: uuidv4(),
        task: action.payload.task,
        done: false,
      });
    },
    toggleDone: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.done = !todo.done;
      }
    },
    remove: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { add, toggleDone, remove } = todosSlice.actions;
export default todosSlice.reducer;
