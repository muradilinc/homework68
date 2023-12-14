import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../redux/store';
import axiosApi from '../../axiosApi';

export const postTask = createAsyncThunk<void, undefined, {state: RootState}>(
  'task/postTask',
  async (_, thunkAPI) => {
    const {task} = thunkAPI.getState().task;
    await axiosApi.post('/tasks.json', task);
  }
);