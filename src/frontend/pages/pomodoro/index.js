import './pomodoro.css';
import { Fragment, useState, useEffect } from 'react';
import { Loader } from '../../components';
import Newtask from './Newtask';
import Tasks from './Tasks';
import { useSelector, useDispatch } from 'react-redux';
import { updatePostHandler } from '../../actions/noteActions';
import Clock from './Clock';
import { authActions } from '../../store/authSlice';

export default function Pomodoro() {
  const [usertasks, setuserTasks] = useState([]);
  const { user, authLoader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.tasks.length) {
      let temp = [...user?.tasks];
      setuserTasks(temp);
    }
  }, [user]);

  const handleNewTask = (newTask) => {
    dispatch(
      updatePostHandler({
        uid: user?.uid,
        note: { ...user, tasks: [...usertasks, newTask] }
      })
    );
  };

  const handleDeletetask = (task) => {
    let temp = usertasks.filter((item) => item.id !== task.id);
    dispatch(
      updatePostHandler({
        uid: user?.uid,
        note: { ...user, tasks: temp }
      })
    );
    setuserTasks(temp);
    dispatch(authActions.getTask(null));
    localStorage.removeItem('taskObject');
  };

  const handleComplete = (task) => {
    let temp = usertasks.reduce(
      (acc, curr) =>
        curr.id === task.id
          ? [...acc, { ...curr, completed: true }]
          : [...acc, curr],
      []
    );
    dispatch(
      updatePostHandler({
        uid: user?.uid,
        note: { ...user, tasks: [...usertasks, temp] }
      })
    );
  };

  return (
    <Fragment>
      <h1 className='pomodoro__title'>Pomodoro Clock</h1>
      {authLoader === 'pending' ? (
        <Loader />
      ) : (
        <div
          className={`task__box ${
            authLoader === 'pending' ? 'pointerEvents' : ''
          }`}
        >
          <div className='aside_left'>
            <Newtask handleNewTask={handleNewTask} />
            <Tasks usertasks={usertasks} handleDeletetask={handleDeletetask} />
          </div>
          <div className='aside_right'>
            <Clock task={task} handleComplete={handleComplete} />
          </div>
        </div>
      )}
    </Fragment>
  );
}
