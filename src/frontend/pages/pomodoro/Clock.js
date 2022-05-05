import './pomodoro.css';
import { Fragment, useState, useEffect, useRef } from 'react';
const DASHEDARRAY = 468;

export default function Clock({
  task = {
    title: 'Title 1',
    description:
      'Complete the task, Complete the task, Complete the task, Complete the task, Complete the task, Complete the task, Complete the task, Complete the task',
    time: 60,
    completed: false
  }
}) {
  const [start, setStart] = useState(true);
  const [pause, setPause] = useState(false);
  const [mins, setMins] = useState(
    localStorage.getItem('mins') ? JSON.parse(localStorage.getItem('mins')) : 4
  );
  const [seconds, setSeconds] = useState(
    localStorage.getItem('seconds')
      ? JSON.parse(localStorage.getItem('seconds'))
      : 59
  );
  const [offset, setOffset] = useState(
    localStorage.getItem('offset')
      ? JSON.parse(localStorage.getItem('offset'))
      : 0
  );
  const offsetStep = DASHEDARRAY / (mins * 60 + seconds);
  const timeRef = useRef(null);

  useEffect(() => {
    let id;

    if (!start) {
      if (!pause) {
        id = setTimeout(() => {
          setSeconds((e) => e - 1);
          setOffset((e) => e + offsetStep);
        }, 1000);
        timeRef.current = id;
        if (seconds === 0) {
          if (mins) {
            setSeconds(59);
            setMins(mins - 1);
          } else {
            setSeconds(59);
            setMins(4);
            setOffset(0);
            setStart(true);
            clearTimeout(id);
          }
        }
      }
    }

    return () => clearTimeout(id);
  }, [seconds, mins, offsetStep, pause, start]);

  const handleClockEnd = () => {
    clearTimeout(timeRef.current);
    setSeconds(59);
    setMins(4);
    setOffset(0);
    setStart(true);
  };

  useEffect(() => {
    localStorage.setItem('mins', JSON.stringify(mins));
    localStorage.setItem('seconds', JSON.stringify(seconds));
    localStorage.setItem('offset', JSON.stringify(offset));
  }, [mins, offset, seconds]);

  return (
    <Fragment>
      <div className='clock'>
        <h1 className='clock__title'>{task?.title}</h1>
        <hr />
        <p className='clock__para'>{task?.description}</p>
        <div className='donut'>
          <div className='outer'>
            <div className='inner'>
              <div className='time'>{`${mins > 9 ? mins : '0' + mins}:${
                seconds < 10 ? '0' + seconds : seconds
              }`}</div>
            </div>
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            width='180px'
            height='180px'
          >
            <circle
              className='circle'
              cx='74'
              cy='81'
              r='75'
              stroke-linecap='round'
              strokeDasharray={DASHEDARRAY}
              strokeDashoffset={offset}
            />
          </svg>
        </div>
        <section className='clock__buttons'>
          {start && (
            <button
              className='btn btn--clock btn--start'
              onClick={() => setStart(false)}
            >
              <i className='fa-solid fa-check'></i> Start
            </button>
          )}
          {!start && (
            <button
              className='btn btn--clock btn--pause'
              onClick={() => setPause((e) => !e)}
            >
              {pause ? (
                <span>
                  <i className='fa-solid fa-play'></i> Continue
                </span>
              ) : (
                <span>
                  <i className='fa-solid fa-pause'></i> Pause
                </span>
              )}
            </button>
          )}
          {!start && (
            <button
              className='btn btn--clock btn--end'
              onClick={handleClockEnd}
            >
              <i className='fa-solid fa-square'></i> End
            </button>
          )}
        </section>
      </div>
    </Fragment>
  );
}
