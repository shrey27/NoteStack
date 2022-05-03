import './loader.css';
import { useTheme } from '../../context';

const darkImg = 'https://res.cloudinary.com/apollo27/image/upload/v1651501490/Infinity-dark_fjexsu.gif';
const lightImg = 'https://res.cloudinary.com/apollo27/image/upload/v1651501490/infinity_light_lbwit8.gif';

export function Loader() {
  const { theme } = useTheme();
  return (
    <div className='loader'>
      <img src={theme === 'dark' ? darkImg : lightImg} alt='loader' />
    </div>
  );
}
