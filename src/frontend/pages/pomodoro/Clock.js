import './pomodoro.css';
import { Fragment, useState, useEffect, useRef } from 'react';
const DASHEDARRAY = 468;

export default function Clock({ task, handleComplete }) {
  const [start, setStart] = useState(true);
  const [pause, setPause] = useState(false);

  const [mins, setMins] = useState(
    localStorage.getItem('seconds')
      ? JSON.parse(localStorage.getItem('mins'))
      : Number(task?.time)
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

  const handleClockEnd = () => {
    clearTimeout(timeRef.current);
    setSeconds(0);
    setMins(0);
    setOffset(0);
    localStorage.removeItem('mins');
    localStorage.removeItem('seconds');
    localStorage.removeItem('offset');
    setStart(true);
    if (task != null) {
      handleComplete(task);
    }
  };

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
              strokeLinecap='round'
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
