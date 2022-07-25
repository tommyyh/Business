import React from 'react';
import css from './m.module.scss';
import { MicSvg } from '../../../../utils/Svg';

const Main = () => {
  return (
    <div className={css.main_cont}>
      <div className={css.main}>
        <h1>Meet Someone New</h1>
        <p>
          suspendisse in est ante in nibh mauris cursus mattis molestie a
          iaculis
        </p>
        <div className={css.mic_svg}>
          <MicSvg />
        </div>
      </div>
    </div>
  );
};

export default Main;
