import React, {FormEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {saveTask} from '../../containers/App/TaskSlice';
import {postTask} from '../../containers/App/TaskThunk';
import {AppDispatch} from '../../redux/store';

const Form = () => {
  const dispatch: AppDispatch = useDispatch();
  const [task, setTask] = useState<Task>({
    title: '',
    status: false,
  });

  const changeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(prevState => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  const createTask = async (event: FormEvent) => {
    event.preventDefault();
    dispatch(saveTask(task));
    await dispatch(postTask());
  };

  return (
    <form
      onSubmit={createTask}
      className="flex justify-center items-center my-5 gap-2"
    >
      <div className="w-[60%]">
        <input
          type="text"
          onChange={changeTask}
          className="bg-gray-50 border border-gray-300 outline-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
      <div>
        <button
          className="capitalize text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="submit"
        >
          add
        </button>
      </div>
    </form>
  );
};

export default Form;