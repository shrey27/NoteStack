import './App.css';
import { Navbar } from './frontend/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './frontend/context';
import { availableRoutes } from './frontend/routes';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { authActions } from './frontend/store/authSlice';
import { useDispatch } from 'react-redux';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0);
  }, [pathname]);
  return null;
};

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageAuth = localStorage.getItem('token');
    if (localStorageAuth) {
      dispatch(authActions.getToken(localStorageAuth));
      const localStorageUser = localStorage.getItem('user');
      dispatch(
        authActions.getUser(
          localStorageUser ? JSON.parse(localStorageUser) : null
        )
      );
    }
  }, [dispatch]);
  return (
    <div className='App' app-theme={theme}>
      <ScrollToTop />
      <Navbar />
      {availableRoutes}
      <ToastContainer style={{ fontWeight: '500', fontSize: '1.15rem' }} />
    </div>
  );
}

export default App;
