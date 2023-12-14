import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {postTask} from './TaskThunk';

interface TaskState {
  task: Task | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: TaskState = {
  task: null,
  isLoading: false,
  isError: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    saveTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postTask.pending, (state) =>{
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
  },
});

export const taskReducer = taskSlice.reducer;
export const {saveTask} = taskSlice.actions;