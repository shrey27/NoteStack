import './authentication.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SIGNIN } from '../../routes';
import { regexArray } from '../../utility/constants';
import { Loader } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { signUpHandler } from '../../actions/authActions';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailDetails, setEmailDetails] = useState({
    username: 'Shrey Pandey',
    email: 'shreyp@gmail.com',
    password: 'Shreypandey27',
    confirmPassword: 'Shreypandey27'
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { authLoader } = useSelector((state) => state.auth);

  const validateFields = () => {
    const { username, email, confirmPassword, password } = emailDetails;
    if (!email || !password || !confirmPassword || !username) {
      setError('FILL ALL THE DETAILS IN PROPER FORMAT');
      return false;
    }
    if (!regexArray.email.test(email)) {
      setError('ENTER EMAIL IN CORRECT FORMAT');
      return false;
    }
    if (password.length < 8) {
      setError('PASSWROD MUST BE 8 CHARS LONG');
      return false;
    }
    if (confirmPassword !== password) {
      setError('PASSWROD AND CONFRIM PASSWORD DO NOT MATCH');
      return false;
    }
    return true;
  };

  const onSignUpHandler = (e) => {
    e.preventDefault();
    const { username, email, password } = emailDetails;
    if (validateFields()) {
      dispatch(
        signUpHandler({username, email, password, navigate})
      ).unwrap();
    }
  };

  return (
    <div className='signupPage'>
      {authLoader === 'pending' ? (
        <Loader />
      ) : (
        <div className='card authentication shdw'>
          {error.length ? <h1 className='alert text cen sm'>{error}</h1> : ''}
          <h1 className='lg sb cen xs-s mg-full'>SIGN UP</h1>
          <hr />
          <form action='#' className='sm-s'>
            <div className='authentication__input'>
              <label htmlFor='name__signup' className='label'>
                Enter Your Name
              </label>
              <input
                className='input sm-s'
                type='text'
                name='name__signup'
                id='name__signup'
                placeholder='Enter your Name'
                autoComplete='off'
                aria-autocomplete='none'
                value={emailDetails.username}
                onChange={(e) =>
                  setEmailDetails({ ...emailDetails, username: e.target.value })
                }
                onFocus={() => setError('')}
              />
            </div>
            <div className='authentication__input'>
              <label htmlFor='email__signup' className='label'>
                Enter Your Email ID
              </label>
              <input
                className='input sm-s'
                type='email'
                name='email__signup'
                id='email__signup'
                placeholder='Enter Email'
                autoComplete='off'
                aria-autocomplete='none'
                value={emailDetails.email}
                onChange={(e) =>
                  setEmailDetails({ ...emailDetails, email: e.target.value })
                }
                onFocus={() => setError('')}
              />
            </div>
            <div className='authentication__input'>
              <label htmlFor='password__signup' className='label'>
                Enter Password
              </label>
              <div className='input__container'>
                <input
                  className='input input__password sm-s'
                  type={showPassword ? 'text' : 'password'}
                  name='password__signup'
                  id='password__signup'
                  autoComplete='off'
                  placeholder='Enter Password'
                  value={emailDetails.password}
                  onChange={(e) =>
                    setEmailDetails({
                      ...emailDetails,
                      password: e.target.value
                    })
                  }
                  onFocus={() => setError('')}
                />
                <i
                  className='fa-solid fa-eye input__eye'
                  onClick={() => setShowPassword((e) => !e)}
                ></i>
              </div>
            </div>
            <div className='authentication__input'>
              <label htmlFor='cnf__password__signup' className='label'>
                Confirm Password
              </label>
              <div className='input__container'>
                <input
                  className='input input__password sm-s'
                  type='password'
                  name='cnf__password__signup'
                  id='cnf__password__signup'
                  autoComplete='off'
                  placeholder='Re-enter Password'
                  value={emailDetails.confirmPassword}
                  onChange={(e) =>
                    setEmailDetails({
                      ...emailDetails,
                      confirmPassword: e.target.value
                    })
                  }
                  onFocus={() => setError('')}
                />
              </div>
            </div>
            <button
              type='submit'
              className='btn btn--wide btn--auth--solid sb'
              onClick={onSignUpHandler}
            >
              SIGN UP
            </button>
          </form>
          <div className='signin__links'>
            <Link to={SIGNIN} className='already sm'>
              Already have an account?
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
