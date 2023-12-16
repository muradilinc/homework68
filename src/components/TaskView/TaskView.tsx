import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import TaskItem from './TaskItem';

const TaskView = () => {
  const {tasks} = useSelector((state: RootState) => state.task);
  return (
    <>
      <h2 className="text-3xl text-center">Tasks</h2>
      <div className="grid grid-cols-1 gap-y-3 w-[80%] mx-auto">
        {
          tasks.map((task) => <TaskItem key={task.id} task={task}/>)
        }
      </div>
    </>
  );
};

export default TaskView;