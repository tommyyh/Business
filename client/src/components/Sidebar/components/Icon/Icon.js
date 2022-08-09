import React from 'react';
import css from './i.module.scss';
import { Link } from 'react-router-dom';
import {
  FaMicrophone,
  FaCompass,
  FaComments,
  FaUserFriends,
  FaCog,
  FaUser,
} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons';

const iconSize = 20;

export const MicIcon = ({ active }) => {
  return (
    <Link
      to='/app'
      className={
        active === 'app'
          ? `${css.sidebar_icon} ${css.sidebar_icon_active}`
          : css.sidebar_icon
      }
    >
      <FaMicrophone size={iconSize} style={{ marginRight: '-0.03rem' }} />
      <p className={css.icon_text}>Sample Text</p>
    </Link>
  );
};

export const CompassIcon = ({ active }) => {
  return (
    <Link
      to='/app/meet'
      className={
        active === 'meet'
          ? `${css.sidebar_icon} ${css.sidebar_icon_active}`
          : css.sidebar_icon
      }
    >
      <FaCompass size={iconSize} style={{ marginRight: '-0.03rem' }} />
      <p className={css.icon_text}>Explore</p>
    </Link>
  );
};

export const CommentsIcon = ({ active }) => {
  return (
    <Link
      to='/app/direct'
      className={
        active === 'direct'
          ? `${css.sidebar_icon} ${css.sidebar_icon_active}`
          : css.sidebar_icon
      }
    >
      <FaComments size={iconSize} style={{ marginRight: '-0.03rem' }} />
      <p className={css.icon_text}>Your Chats</p>
    </Link>
  );
};

export const FriendsIcon = ({ friendsOpen, setFriendsOpen }) => {
  return (
    <Link
      to=''
      className={
        friendsOpen
          ? `${css.sidebar_icon} ${css.sidebar_icon_friends}`
          : css.sidebar_icon
      }
      onClick={setFriendsOpen}
    >
      <FaUserFriends
        size={iconSize}
        style={{ marginRight: '-0.03rem' }}
        color={friendsOpen ? '#262626' : '#fff'}
      />
      <p className={css.icon_text}>Friends List</p>
    </Link>
  );
};

export const NodeIcon = ({ nodesOpen, setNodesOpen }) => {
  return (
    <Link
      to=''
      className={
        nodesOpen
          ? `${css.sidebar_icon} ${css.sidebar_icon_nodes}`
          : css.sidebar_icon
      }
      onClick={setNodesOpen}
    >
      <FontAwesomeIcon
        icon={faCircleNodes}
        size='lg'
        color={nodesOpen ? '#262626' : '#fff'}
      />
      <p className={css.icon_text}>Your Nodes</p>
    </Link>
  );
};

export const CogIcon = ({ active }) => {
  return (
    <Link
      to='/app'
      className={
        active === 'fef'
          ? `${css.sidebar_icon} ${css.sidebar_icon_active}`
          : css.sidebar_icon
      }
    >
      <FaCog size={iconSize} style={{ marginRight: '-0.03rem' }} />
      <p className={css.icon_text}>Settings</p>
    </Link>
  );
};

export const UserIcon = ({ active, setProfileOpen, profilePic }) => {
  return (
    <div
      className={
        active === 'fe'
          ? `${css.sidebar_icon} ${css.sidebar_icon_active}`
          : css.sidebar_icon
      }
      onClick={() => setProfileOpen(true)}
    >
      <img
        src={profilePic}
        alt='User profile'
        style={{
          width: '53.59px',
          height: '53.59px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <p className={css.icon_text}>Your Profile</p>
    </div>
  );
};

export const FriendIcon = ({ active }) => {
  return (
    <Link
      to='/app'
      className={
        active === 'fe'
          ? `${css.sidebar_icon} ${css.sidebar_icon_active}`
          : css.sidebar_icon
      }
    >
      <FaUser size={iconSize} style={{ marginRight: '-0.03rem' }} />
    </Link>
  );
};
