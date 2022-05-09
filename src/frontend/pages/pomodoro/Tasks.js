import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import './pomodoro.css';

export default function Tasks({ usertasks = [], handleDeletetask }) {
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setTasks([...usertasks]);
  }, [usertasks]);

  const handleTaskUpdate = (id) => {
    const taskObject = usertasks.find((item) => item.id === id);
    dispatch(authActions.getTask(taskObject));
    if (taskObject.title) {
      localStorage.setItem('title', taskObject?.title);
      localStorage.setItem('description', taskObject?.description);
      localStorage.setItem('mins', taskObject?.time - 1);
      localStorage.setItem('seconds', 59);
    }
  };

  return (
    <Fragment>
      {tasks?.map((task) => {
        return (
          <div key={task.id} className='task'>
            <h1 className='task__title'>{task.title}</h1>
            <hr />
            <p className='task__para'>{task.description}</p>

            <div className='flex-ct-sb'>
              <h1 className='task__time'>{task.time} mins</h1>
              <section className='task__section'>
                {task.completed ? (
                  <button className='btn btn--task btn--complete'>
                    <i className='fa-solid fa-circle-check'></i> Complete
                  </button>
                ) : (
                  <button
                    className='btn btn--task btn--incomplete'
                    onClick={handleTaskUpdate.bind(this, task.id)}
                  >
                    <i className='fa-solid fa-circle-xmark'></i> Incomplete
                  </button>
                )}
                <button
                  className='btn btn--task btn--delete'
                  onClick={handleDeletetask.bind(this, task)}
                >
                  <i className='fa-solid fa-trash'></i> Delete
                </button>
              </section>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
