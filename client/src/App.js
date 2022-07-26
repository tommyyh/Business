import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from './lib/axios';
import Home from './pages/Home/index';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import AppHome from './app/Home/index';
import Meet from './app/Meet/Meet';
import {
  setDob,
  setEmail,
  setName,
  setSurname,
  login,
  logout,
} from './features/user/userSlice';

function App() {
  const ModifiedRoute = ({ Component, type }) => {
    const [loading, setLoading] = useState(true);
    const location = window.location.pathname;
    const dispatch = useDispatch();

    useEffect(() => {
      (async () => {
        const res = await get('/user/authenticate/');
        const { status, name, surname, dob, email } = res.data;

        if (status === 401) {
          dispatch(logout());
          dispatch(setName(undefined));
          dispatch(setSurname(undefined));
          dispatch(setDob(undefined));
          dispatch(setEmail(undefined));
          setLoading(false);

          return;
        }

        dispatch(login());
        dispatch(setName(name));
        dispatch(setSurname(surname));
        dispatch(setDob(dob));
        dispatch(setEmail(email));
        setLoading(false);
      })();
    }, [location]);

    const user = useSelector((state) => state.user.value);

    if (loading) return <h1>Loading...</h1>; // public, private, signedOut

    if (type === 'private')
      return user.loggedIn ? <Component /> : <Navigate to='/login' />;

    if (type === 'signedOut')
      return user.loggedIn ? <Navigate to='/' /> : <Component />;

    return <Component />;
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={<ModifiedRoute Component={Home} type='public' />}
        />
        <Route
          exact
          path='/about'
          element={<ModifiedRoute Component={About} type='public' />}
        />
        <Route
          exact
          path='/sign-up'
          element={<ModifiedRoute Component={Register} type='signedOut' />}
        />
        <Route
          exact
          path='/login'
          element={<ModifiedRoute Component={Login} type='signedOut' />}
        />

        {/* App Routes */}
        <Route
          exact
          path='/app'
          element={<ModifiedRoute Component={AppHome} type='private' />}
        />
        <Route
          exact
          path='/app/meet'
          element={<ModifiedRoute Component={Meet} type='private' />}
        />
      </Routes>
    </Router>
  );
}

export default App;
