import React from 'react';
import css from './h.module.scss';
import { Link } from 'react-router-dom';
import Hamburger from '../../assets/img/hamburger.svg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { logout as signOut } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const logout = async () => {
    const res = await axios.delete('/user/logout/');

    if (res.data.status !== 200) return;

    dispatch(signOut());
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <h2>
          <Link to={'/'}>Company</Link>
        </h2>

        <img src={Hamburger} alt='' className='hamburger' />

        <div className={css.nav_mid}>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/about'}>About Us</Link>
            </li>
            <li>
              <Link to={'/'}>Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className={css.nav_bottom}>
          {!user.loggedIn ? (
            <ul>
              <li>
                <Link to={'/login'}>Login</Link>
              </li>
              <li>
                <Link to={'/sign-up'}>Sign Up</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to={'/login'}>Profile</Link>
              </li>
              <li className={css.logout} onClick={logout}>
                Logout
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
