import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './s.module.scss';
import Icons from './components/Icons/Icons';
import FriendsList from './components/FriendsList/FriendsList';
import { friendsOpen as friendsOpenFn } from '../../features/user/userSlice';
import Add from './components/Add/Add';
import Profile from './components/Profile/Profile';

const Sidebar = () => {
  const [active, setActive] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [socket, setSocket] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const friendsOpen = useSelector((state) => state.user.value).friendsOpen
    .payload;
  const dispatch = useDispatch();

  useEffect(() => {
    const path = window.location.pathname.split('/')[2];

    if (!path) return setActive('app');

    setActive(path);
  }, []);

  return (
    <>
      {addOpen && <Add setAddOpen={() => setAddOpen(false)} socket={socket} />}
      {profileOpen && <Profile closeProfile={() => setProfileOpen(false)} />}
      <FriendsList
        friendsOpen={friendsOpen}
        setAddOpen={() => setAddOpen(true)}
        setSocket={setSocket}
        socket={socket}
      />
      <div className={css.sidebar}>
        <Icons
          active={active}
          friendsOpen={friendsOpen}
          setFriendsOpen={() => dispatch(friendsOpenFn(!friendsOpen))}
          setProfileOpen={setProfileOpen}
        />
      </div>
    </>
  );
};

export default Sidebar;
