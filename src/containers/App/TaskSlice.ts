import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTasks, postTask} from './TaskThunk';
import {Task} from '../../types';

interface TaskState {
  task: Task | null;
  tasks: Task[],
  isLoading: boolean;
  isError: boolean;
}

const initialState: TaskState = {
  task: null,
  tasks: [],
  isLoading: false,
  isError: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    saveTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    changeTaskStatusById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.tasks = state.tasks.map((task) => {
        if (task.id === id){
          return {
            ...task,
            status: !task.status,
          };
        }
        return task;
      });
    },
    deleteTaskById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postTask.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postTask.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(postTask.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(getTasks.rejected, (state) =>{
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const taskReducer = taskSlice.reducer;
export const {
  saveTask,
  changeTaskStatusById,
  deleteTaskById,
} = taskSlice.actions;