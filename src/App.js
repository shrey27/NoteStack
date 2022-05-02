import './App.css';
import { Navbar } from './frontend/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './frontend/context';
import { availableRoutes } from './frontend/routes';

function App() {
  const { theme } = useTheme();
  return (
    <div className='App' app-theme={theme}>
      <Navbar />
      {availableRoutes}
      <ToastContainer style={{ fontWeight: '500', fontSize: '1.15rem' }} />
    </div>
  );
}

export default App;

// https://res.cloudinary.com/apollo27/image/upload/v1651430405/logo_dark_felwi6.png
