import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from './lib/axios';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import {
  setDob,
  setEmail,
  setName,
  setSurname,
  login,
  logout,
} from './features/user/userSlice';

function App() {
  const PublicRoute = ({ Component }) => {
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

          return;
        }

        dispatch(login());
        dispatch(setName(name));
        dispatch(setSurname(surname));
        dispatch(setDob(dob));
        dispatch(setEmail(email));
      })();
    }, [location]);

    return <Component />;
  };

  const LoggedOutRoute = ({ Component }) => {
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

          return;
        }

        dispatch(login());
        dispatch(setName(name));
        dispatch(setSurname(surname));
        dispatch(setDob(dob));
        dispatch(setEmail(email));
      })();
    }, [location]);

    const user = useSelector((state) => state.user.value);

    return user.loggedIn ? <Navigate to='/' /> : <Component />;
  };

  const RestrictedRoute = ({ Component }) => {
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

          return;
        }

        dispatch(login());
        dispatch(setName(name));
        dispatch(setSurname(surname));
        dispatch(setDob(dob));
        dispatch(setEmail(email));
      })();
    }, [location]);

    const user = useSelector((state) => state.user.value);

    return !user.loggedIn ? <Navigate to='/' /> : <Component />;
  };

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<PublicRoute Component={Home} />} />
        <Route
          exact
          path='/about'
          element={<PublicRoute Component={About} />}
        />
        <Route
          exact
          path='/sign-up'
          element={<LoggedOutRoute Component={Register} />}
        />
        <Route
          exact
          path='/login'
          element={<LoggedOutRoute Component={Login} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
