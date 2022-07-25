import React from 'react';
import css from './a.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Main from './copmonents/Main/Main';

const App = () => {
  return (
    <div className={css.cont}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
