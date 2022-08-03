import React from 'react';
import css from './c.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Main from './components/Main/Main';

const Chat = () => {
  return (
    <div className={css.cont}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default Chat;
