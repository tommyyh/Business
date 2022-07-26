import React from 'react';
import css from './i.module.scss';
import {
  CogIcon,
  CompassIcon,
  CommentsIcon,
  FriendsIcon,
  MicIcon,
  UserIcon,
} from '../../components/Icon/Icon';

const Icons = ({ active, setFriendsOpen, friendsOpen }) => {
  return (
    <>
      <div className={css.sidebar_up}>
        <MicIcon active={active} />
        <CompassIcon active={active} />
        <CommentsIcon active={active} />
        <FriendsIcon
          active={active}
          setFriendsOpen={setFriendsOpen}
          friendsOpen={friendsOpen}
        />
      </div>
      <div className={css.sidebar_bot}>
        <UserIcon active={active} />
        <CogIcon active={active} />
      </div>
    </>
  );
};

export default Icons;
