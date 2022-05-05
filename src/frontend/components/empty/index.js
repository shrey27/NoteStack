import './Empty.css';
import pic from '../../assets/empty.jpg';

export function Empty({ statement }) {
  return (
    <div className='empty'>
      <img src={pic} className='empty__image' alt='empty' />
      <h2 className='empty__title'>FOLDER IS EMPTY</h2>
    </div>
  );
}
