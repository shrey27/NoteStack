import './landing.css';
import { Link } from 'react-router-dom';
import { HOMEPAGE } from '../../routes';
import banner from '../../assets/banner.svg';

export default function Landing() {
  return (
    <div>
      <main className='landing'>
        <div className='landing__bnr'>
          <img
            src={banner}
            alt='banner'
            className='landing__bnr__img img--resp'
          />
        </div>
        <div className='landing__cnt'>
          <p className='landing__slogan'>
            <span className='tertiary'>Create It.</span>
            <span className='primary'>Modify It.</span>
            <span className='tertiary'>Plan It.</span>
          </p>
          <p className='landing__para'>
            Create notes, style them or archive them. If that's not enough, plan
            a task and finish it using a pomodoro clock
          </p>
          <div className='flex-ct-st mg--full'>
            <Link to={HOMEPAGE} className='btn btn--auth--solid btn--landing'>
              Get Started
            </Link>
            <a
              href='https://github.com/shrey27/NoteStack'
              className='btn btn--cancel btn--landing'
              target='_blank'
              rel='noreferrer'
            >
              Github Link
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
