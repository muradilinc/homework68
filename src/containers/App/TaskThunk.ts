import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../redux/store';
import axiosApi from '../../axiosApi';
import {TaskList} from '../../types';

export const postTask = createAsyncThunk<void, undefined, {state: RootState}>(
  'task/postTask',
  async (_, thunkAPI) => {
    const {task} = thunkAPI.getState().task;
    await axiosApi.post('/tasks.json', task);
  }
);

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async () => {
    const response = await axiosApi.get<TaskList | null>('/tasks.json');
    if (!response.data){
      return [];
    }
    return Object.keys(response.data).map((id) => {
      const task = response.data![id];
      return {
        ...task,
        id
      };
    });
  }
);

export const changeStatus = createAsyncThunk<void, string, {state: RootState}>(
  'task/changeStatus',
  async (id, thunkAPI) => {
    const tasks = thunkAPI.getState().task.tasks;
    const selectTask = tasks.filter((task) =>  task.id === id);
    await axiosApi.put(`/tasks/${id}.json`, selectTask[0]);
  }
);

export const deleteTask = createAsyncThunk<void, string>(
  'task/deleteTask',
  async (id) => {
    await axiosApi.delete(`/tasks/${id}.json`);
  }
);