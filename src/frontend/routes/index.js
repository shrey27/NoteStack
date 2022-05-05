import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing';
import Homepage from '../pages/homepage';

// Routes
export const LANDING = '/';
export const HOMEPAGE = '/homepage';
export const SIGNUP = '/signup';
export const SIGNIN = '/signin';
export const NOTFOUND = '*';

export const availableRoutes = (
  <Routes>
    <Route path={LANDING} element={<Landing />} />
    <Route path={HOMEPAGE} element={<Homepage />} />
  </Routes>
);

/*
{
  <Route path={SIGNUP} element={<Signup />} />
    <Route path={SIGNIN} element={<Signin />} />
    <Route path={NOTFOUND} element={<NotFound />} /> 
    <Route path={LANDING} element={<PrivateRoute />}>
    <Route path={HOMEPAGE} element={<Homepage />} />
  </Route>
}
*/
