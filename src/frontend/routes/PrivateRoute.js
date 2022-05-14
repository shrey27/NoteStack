import { Fragment } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { SIGNIN } from './index';

export default function PrivateRoute() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  return (
    <Fragment>
      {token ? (
        <Outlet />
      ) : (
        <Navigate to={SIGNIN} state={{ from: location }} replace={true} />
      )}
    </Fragment>
  );
}
