import { Fragment, useEffect, useState } from 'react';
import './pomodoro.css';

export default function Tasks({ usertasks, handleNewTask, handleDeletetask }) {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      title: 'task 1',
      description: 'complete task',
      time: 30,
      completed: true
    },
    {
      id: 1,
      title: 'task 2',
      description: 'complete task',
      time: 60,
      completed: false
    },
    {
      id: 2,
      title: 'task 3',
      description: 'complete task',
      time: 90,
      completed: false
    }
  ]);

  //   useEffect(() => {
  //     setTasks([...setTasks]);
  //   }, [usertasks]);

  return (
    <Fragment>
      {tasks?.map((task) => {
        return (
          <div key={task.id} className='task'>
            <h1 className='task__title'>{task.title}</h1>
            <hr />
            <p className='task__para'>{task.description}</p>
            <h1 className='task__time'>{task.time} mins</h1>
            <section className='task__section'>
              {task.completed ? (
                <button className='btn btn--task btn--complete'>
                  <i class='fa-solid fa-circle-check'></i> Complete
                </button>
              ) : (
                <button className='btn btn--task btn--incomplete'>
                  <i class='fa-solid fa-circle-xmark'></i> Incomplete
                </button>
              )}
              <button className='btn btn--task btn--delete'>
                <i class='fa-solid fa-trash'></i> Delete
              </button>
            </section>
          </div>
        );
      })}
    </Fragment>
  );
}
