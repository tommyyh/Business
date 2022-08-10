import React from 'react';
import css from './i.module.scss';
import {
  CogIcon,
  CompassIcon,
  CommentsIcon,
  FriendsIcon,
  MicIcon,
  UserIcon,
  NodeIcon,
} from '../../components/Icon/Icon';
import { useSelector } from 'react-redux';

const Icons = ({
  active,
  setFriendsOpen,
  friendsOpen,
  setProfileOpen,
  setNodesOpen,
  nodesOpen,
  setNewNodeOpen,
}) => {
  const user = useSelector((state) => state.user.value);

  return (
    <>
      <div className={css.sidebar_up}>
        <MicIcon active={active} />
        <CompassIcon active={active} />
        <CommentsIcon active={active} />
        <NodeIcon
          active={active}
          setNodesOpen={setNodesOpen}
          nodesOpen={nodesOpen}
        />
        <FriendsIcon
          active={active}
          setFriendsOpen={setFriendsOpen}
          friendsOpen={friendsOpen}
        />
      </div>
      <div className={css.sidebar_bot}>
        <UserIcon
          active={active}
          setProfileOpen={setProfileOpen}
          profilePic={user.profilePic.payload}
        />
        <CogIcon active={active} />
      </div>
    </>
  );
};

export default Icons;
