import React, { useState, useRef } from 'react';
import css from './f.module.scss';
import { post } from '../../../../lib/axios';
import { FaEllipsisH } from 'react-icons/fa';

const Friend = ({ friend, setFriends, friends }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const menu = useRef();

  const closeOpenMenus = (e) => {
    if (menu.current && optionsOpen && !menu.current.contains(e.target)) {
      setOptionsOpen(false);
    }
  };

  const removeFriend = async (friendUsername) => {
    const res = await post('/user/remove-friend/', {
      friendUsername,
    });

    if (res.data.status === 400) return; // ERROR

    setFriends(
      friends.filter((oneFriend) => oneFriend.username !== friend.username)
    );
  };

  document.addEventListener('mousedown', closeOpenMenus);

  return (
    <div className={css.friends_block} key={friend.id}>
      <div className={css.friends_block_left}>
        <img
          src={friend.profile_pic}
          alt='user profile'
          className={css.user_profile}
        />
        <p>{`${friend.name} ${friend.surname}`}</p>
      </div>
      <div className={css.friend_options} onClick={() => setOptionsOpen(true)}>
        <FaEllipsisH />
      </div>
      {optionsOpen && (
        <ul className={css.options_dropdown} ref={menu}>
          <li onClick={() => removeFriend(friend.username)}>Remove Friend</li>
        </ul>
      )}
    </div>
  );
};

export default Friend;
