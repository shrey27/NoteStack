import './navbar.css';
import { Link } from 'react-router-dom';
import { LANDING } from '../../routes';
import { useTheme } from '../../context';
// import { signOutHandler } from '../../service/userActions';
import { SignoutModal } from '../modal/SignoutModal';
import { useState } from 'react';

export function Navbar() {
  //   const navigate = useNavigate();
  const [signoutModal, setSignoutModal] = useState(false);
  const { theme, switchTheme } = useTheme();
  //   const handleDispatch = () => dispatch(signOutHandler(navigate, LANDING));

  //   const handleAuthentication = () => {
  //     if (token) {
  //       setSignoutModal(true);
  //     } else {
  //       navigate(SIGNIN);
  //     }
  //   };

  return (
    <div>
      {signoutModal && (
        <SignoutModal
          setSignoutModal={setSignoutModal}
          //   handleDispatch={handleDispatch}
        />
      )}
      <nav className='navbar box-shadow'>
        <section className='begin'>
          <Link to={LANDING}>
            <img
              className='box__image'
              src={
                theme === 'dark'
                  ? 'https://res.cloudinary.com/apollo27/image/upload/v1651516250/logonotestack_mtqbog.jpg'
                  : 'https://res.cloudinary.com/apollo27/image/upload/v1651516250/logonotestack_light_oogj8w.jpg'
              }
              alt='logo'
            />
          </Link>
        </section>
        {/* {pathname === '/homepage' && <section className="middle cen sm-s">
                <div className="search--ctr">
                    <i className="fas fa-search search--btn"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        className="input no--bdr"
                        id="user-name"
                        name="user-name"
                        autoComplete="off"
                    />
                </div>
            </section>} */}
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
            {/* {token && (
              <Link to={HOMEPAGE} className='btn--navbar sm sb'>
                <i className='fa-solid fa-house'></i>
              </Link>
            )}
            {token && (
              <Link to={LEADERBOARD} className='btn--navbar sm sb'>
                <i className='fa-solid fa-trophy'></i>
              </Link>
            )}
            <button
              className='btn btn--cancel--solid sm sb'
              onClick={handleAuthentication}
            >
              <span className='logout__mobile'>
                {token ? 'Logout' : 'Login'}
              </span>
              <i className='fa-solid fa-arrow-right-to-bracket'></i>
            </button> */}
          </div>
        </section>
      </nav>
    </div>
  );
}
