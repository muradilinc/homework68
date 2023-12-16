import React from 'react';
import {Task} from '../../types';
import {useDispatch} from 'react-redux';
import {changeStatus, deleteTask} from '../../containers/App/TaskThunk';
import {AppDispatch} from '../../redux/store';
import {changeTaskStatusById, deleteTaskById} from '../../containers/App/TaskSlice';
import {Trash} from '@phosphor-icons/react';

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({task}) => {
  const dispatch: AppDispatch = useDispatch();

  const changeStatusTask = (id: string) => {
    dispatch(changeStatus(id));
    dispatch(changeTaskStatusById(task.id));
  };

  const onDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
    dispatch(deleteTaskById(id));
  };

  return (
    <div
      className="border border-black p-2 flex items-center rounded-xl"
    >
      <div className="flex items-center me-4">
        <input
          checked={task.status}
          onChange={() => changeStatusTask(task.id)}
          id="green-checkbox"
          type="checkbox"
          className="w-4 outline-0 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="flex-grow">
        {
          task.status ?
            <h4 className="text-2xl"><s>{task.title}</s></h4>
            :
            <h4 className="text-2xl">{task.title}</h4>
        }
      </div>
      <button
        onClick={() => onDeleteTask(task.id)}
        className="bg-red-600 text-white text-xl px-5 py-2 rounded-2xl"
      >
        <Trash size={32} />
      </button>
    </div>
  );
};

export default TaskItem;