import './notfound.css';
import pic from '../../assets/404.gif';
import { HOMEPAGE } from '../../routes';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <div className='notfound'>
        <img src={pic} alt='notfound' className='notfound__image' />
        <h1 className='notfound__primary'>Oops! Looks like you are lost. </h1>
        <Link to={HOMEPAGE} className='btn btn--large btn--cancel--solid md sb'>
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
}
