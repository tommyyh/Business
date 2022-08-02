import React from 'react';
import LoadingCSS from './l.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Loading = () => {
  return (
    <>
      <div className={LoadingCSS.loading_cont}>
        <div className={LoadingCSS.loading}>
          <div className={LoadingCSS.loading_icon}>
            <div className={LoadingCSS.spinner}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
