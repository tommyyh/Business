import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './s.module.scss';
import Icons from './components/Icons/Icons';
import FriendsList from './components/FriendsList/FriendsList';
import { friendsOpen as friendsOpenFn } from '../../features/user/userSlice';

const Sidebar = () => {
  const [active, setActive] = useState('');
  const friendsOpen = useSelector((state) => state.user.value).friendsOpen
    .payload;
  const dispatch = useDispatch();

  console.log(friendsOpen);

  useEffect(() => {
    const path = window.location.pathname.split('/')[2];

    if (!path) return setActive('app');

    setActive(path);
  }, []);

  return (
    <>
      <FriendsList friendsOpen={friendsOpen} />
      <div className={css.sidebar}>
        <Icons
          active={active}
          friendsOpen={friendsOpen}
          setFriendsOpen={() => dispatch(friendsOpenFn(!friendsOpen))}
        />
      </div>
    </>
  );
};

export default Sidebar;
