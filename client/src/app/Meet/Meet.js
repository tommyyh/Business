import React from 'react';
import css from './m.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Main from './copmonents/Main/Main';

const Meet = () => {
  return (
    <div className={css.cont}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default Meet;
