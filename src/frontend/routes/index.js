import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing';
import Homepage from '../pages/homepage';
import Signin from '../pages/authentication/Signin';
import Signup from '../pages/authentication/Signup';
import Trash from '../pages/trash';
import Archive from '../pages/archive';

// Routes
export const LANDING = '/';
export const HOMEPAGE = '/homepage';
export const SIGNUP = '/signup';
export const SIGNIN = '/signin';
export const TRASH = '/trash';
export const ARCHIVE = '/archive';
export const NOTFOUND = '*';

export const availableRoutes = (
  <Routes>
    <Route path={LANDING} element={<Landing />} />
    <Route path={HOMEPAGE} element={<Homepage />} />
    <Route path={SIGNUP} element={<Signup />} />
    <Route path={SIGNIN} element={<Signin />} />
    <Route path={TRASH} element={<Trash />} />
    <Route path={ARCHIVE} element={<Archive />} />
  </Routes>
);

/*
{
    <Route path={NOTFOUND} element={<NotFound />} /> 
    <Route path={LANDING} element={<PrivateRoute />}>
}
*/
