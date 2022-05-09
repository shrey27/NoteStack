import './pomodoro.css';
import { Fragment, useState, useEffect, useRef } from 'react';
const DASHEDARRAY = 468;

export default function Clock({ task, handleComplete }) {
  const [start, setStart] = useState(true);
  const [pause, setPause] = useState(false);

  const [title, setTitle] = useState(localStorage.getItem('title') ?? '');
  const [description, setDescription] = useState(
    localStorage.getItem('title') ?? ''
  );
  const [mins, setMins] = useState(
    localStorage.getItem('seconds')
      ? JSON.parse(localStorage.getItem('mins'))
      : 0
  );
  const [seconds, setSeconds] = useState(
    localStorage.getItem('seconds')
      ? JSON.parse(localStorage.getItem('seconds'))
      : 0
  );
  const [offset, setOffset] = useState(
    localStorage.getItem('offset')
      ? JSON.parse(localStorage.getItem('offset'))
      : 0
  );

  const timeRef = useRef(null);
  const offsetStep = DASHEDARRAY / (mins * 60 + seconds);

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
            setSeconds(0);
            setMins(0);
            setOffset(0);
            setStart(true);
            localStorage.removeItem('mins');
            localStorage.removeItem('seconds');
            localStorage.removeItem('offset');
            handleComplete(task);
            clearTimeout(id);
          }
        }
      }
    }
    return () => clearTimeout(id);
  }, [seconds, mins, pause, start, offsetStep, handleComplete, task]);

  useEffect(() => {
    localStorage.setItem('mins', mins ? JSON.stringify(mins) : 0);
    localStorage.setItem('seconds', seconds ? JSON.stringify(seconds) : 0);
    localStorage.setItem('offset', offset ? JSON.stringify(offset) : 0);
  }, [mins, offset, seconds]);

  useEffect(() => {
    if (task) {
      setTitle(task?.title);
      setDescription(task?.description);
      setMins(task?.time - 1);
      setSeconds(59);
      setOffset(0);
    }
  }, [task]);

  const handleClockEnd = () => {
    clearTimeout(timeRef.current);
    setSeconds(0);
    setMins(0);
    setOffset(0);
    setTitle('');
    setDescription('');
    localStorage.removeItem('mins');
    localStorage.removeItem('seconds');
    localStorage.removeItem('offset');
    localStorage.removeItem('title');
    localStorage.removeItem('description');
    setStart(true);
    if (task != null) {
      handleComplete(task);
    }
  };

  const handleStart = () => {
    if (mins > 0 || seconds > 0) {
      setStart(false);
    }
  };

  return (
    <Fragment>
      <div className='clock'>
        <h1 className='clock__title'>{title}</h1>
        <hr />
        <p className='clock__para'>{description}</p>
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
              strokeLinecap='round'
              strokeDasharray={DASHEDARRAY}
              strokeDashoffset={offset}
            />
          </svg>
        </div>
        <section className='clock__buttons'>
          {start && (
            <button className='btn btn--clock btn--start' onClick={handleStart}>
              <i className='fa-solid fa-check'></i>{' '}
              {mins > 0 && seconds > 0 ? 'Start' : 'Select a Task'}
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
