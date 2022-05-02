import './loader.css';
import { useTheme } from '../../context';

const lightImg = 'https://res.cloudinary.com/apollo27/image/upload/v1651143122/loader_light_ehrxuu.gif';
const darkImg = 'https://res.cloudinary.com/apollo27/image/upload/v1651143122/loader_dark_w4p7xh.gif';

export function Loader() {
  const { theme } = useTheme();
  return (
    <div className='loader'>
      <img src={theme === 'dark' ? darkImg : lightImg} alt='loader' />
    </div>
  );
}
