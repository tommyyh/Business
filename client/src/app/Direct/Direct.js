import React from 'react';
import css from './d.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Friends from './copmonents/Friends/Friends';

const Direct = () => {
  return (
    <div className={css.cont}>
      <Sidebar />
      <Friends />
    </div>
  );
};

export default Direct;
