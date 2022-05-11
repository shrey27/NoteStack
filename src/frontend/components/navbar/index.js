import './navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LANDING, HOMEPAGE, SIGNIN, LABEL, POMODORO } from '../../routes';
import { useTheme } from '../../context';
import { SignoutModal } from '../modal/SignoutModal';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutHandler } from '../../actions/authActions';
import { authActions } from '../../store/authSlice';

export function Navbar() {
  const [signoutModal, setSignoutModal] = useState(false);
  const [search, setSearch] = useState('');
  const { theme, switchTheme } = useTheme();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleDispatch = () =>
    dispatch(signOutHandler({ dispatch, navigate }));

  const handleAuthentication = () => {
    if (token.length) {
      setSignoutModal(true);
    } else {
      navigate(SIGNIN);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(authActions.getSearch(search));
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setSearch('');
  };

  return (
    <div>
      {signoutModal && (
        <SignoutModal
          setSignoutModal={setSignoutModal}
          handleDispatch={handleDispatch}
        />
      )}
      <nav className='navbar box-shadow'>
        <section className='begin'>
          <Link to={LANDING}>
            <img
              className='box__image'
              src={
                theme === 'dark'
                  ? 'https://res.cloudinary.com/apollo27/image/upload/v1651522331/logonotes_dark_daqlmb.jpg'
                  : 'https://res.cloudinary.com/apollo27/image/upload/v1651522331/logonotes_light_kfnq6i.jpg'
              }
              alt='logo'
            />
          </Link>
        </section>
        {pathname === LABEL && (
          <section className='middle cen sm-s'>
            <form
              onSubmit={handleSearch}
              onReset={clearSearch}
              className='search--ctr'
            >
              <button className='search__btn' type='reset'>
                {!search ? (
                  <i className='fas fa-search search--btn'></i>
                ) : (
                  <i className='fa-solid fa-xmark search--btn'></i>
                )}
              </button>
              <input
                type='text'
                placeholder='Search By Label'
                className='input searchbar no--bdr'
                autoComplete='off'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </section>
        )}
        <section className='end sm-s'>
          <div className='menu'>
            {theme === 'light' ? (
              <button className='btn--navbar sm sb' onClick={switchTheme}>
                <i className='fa-solid fa-moon'></i>
              </button>
            ) : (
              <button className='btn--navbar sm sb' onClick={switchTheme}>
                <i className='fa-solid fa-sun'></i>
              </button>
            )}
            <Link to={POMODORO} className='btn--navbar sm sb'>
              <i className='fa-solid fa-bell'></i>
            </Link>
            <Link to={HOMEPAGE} className='btn--navbar sm sb'>
              <i className='fa-solid fa-house'></i>
            </Link>
            <button
              className='btn btn--auth--solid sm sb'
              onClick={handleAuthentication}
            >
              <span className='logout__mobile'>
                {token ? 'Logout' : 'Login'}
              </span>
              <i className='fa-solid fa-arrow-right-to-bracket'></i>
            </button>
          </div>
        </section>
      </nav>
    </div>
  );
}
