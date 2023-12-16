import Form from '../../components/Form/Form';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import Spinner from '../../components/Spinner/Spinner';
import TaskView from '../../components/TaskView/TaskView';
import {useEffect} from 'react';
import {getTasks} from './TaskThunk';

const App = () => {
  const {isLoading} = useSelector((state: RootState) => state.task);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (isLoading){
    return <Spinner/>;
  }

  return (
    <div className="container mx-auto">
      <Form/>
      <TaskView/>
    </div>
  );
};

export default App;