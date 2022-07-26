import React from 'react';
import css from './f.module.scss';
import { FaUserPlus } from 'react-icons/fa';

const FriendsList = ({ friendsOpen }) => {
  return (
    <div
      className={
        friendsOpen
          ? `${css.friends_list} ${css.friends_list_open}`
          : css.friends_list
      }
    >
      <div className={css.add_friends}>
        <FaUserPlus size={23} />
      </div>
    </div>
  );
};

export default FriendsList;
