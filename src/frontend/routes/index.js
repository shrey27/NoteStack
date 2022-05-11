import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing';
import Homepage from '../pages/homepage';
import Signin from '../pages/authentication/Signin';
import Signup from '../pages/authentication/Signup';
import Trash from '../pages/trash';
import Archive from '../pages/archive';
import Label from '../pages/label';
import NotFound from '../pages/notfound';
import Pomodoro from '../pages/pomodoro';
import PrivateRoute from './PrivateRoute';

// Routes
export const LANDING = '/';
export const HOMEPAGE = '/homepage';
export const SIGNUP = '/signup';
export const SIGNIN = '/signin';
export const TRASH = '/trash';
export const ARCHIVE = '/archive';
export const LABEL = '/label';
export const POMODORO = '/pomodoro';
export const NOTFOUND = '*';

export const availableRoutes = (
  <Routes>
    <Route path={LANDING} element={<Landing />} />
    <Route path={SIGNUP} element={<Signup />} />
    <Route path={SIGNIN} element={<Signin />} />
    <Route path={NOTFOUND} element={<NotFound />} />

    <Route path={LANDING} element={<PrivateRoute />}>
      <Route path={HOMEPAGE} element={<Homepage />} />
      <Route path={TRASH} element={<Trash />} />
      <Route path={ARCHIVE} element={<Archive />} />
      <Route path={LABEL} element={<Label />} />
      <Route path={POMODORO} element={<Pomodoro />} />
    </Route>
    
  </Routes>
);