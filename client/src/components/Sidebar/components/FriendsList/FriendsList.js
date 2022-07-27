import React from 'react';
import css from './f.module.scss';
import UserImg from '../../../../assets/img/user.png';

const FriendsList = ({ friendsOpen }) => {
  return (
    <div
      className={
        friendsOpen
          ? `${css.friends_list} ${css.friends_list_open}`
          : css.friends_list
      }
    >
      <div className={css.friends_add_block}>
        <p>Add a Friend</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>

      <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Tyrone Smith</p>
      </div>
    </div>
  );
};

export default FriendsList;
