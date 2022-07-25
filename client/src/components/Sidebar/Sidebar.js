import React from 'react';
import css from './s.module.scss';
import { TipsSvg } from '../../utils/Svg';

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <div className={css.sidebar_up}>
        <TipsSvg className={css.sidebar_icon} />
        <TipsSvg className={css.sidebar_icon} />
        <TipsSvg className={css.sidebar_icon} />
        <TipsSvg className={css.sidebar_icon} />
      </div>
      <div className={css.sidebar_bot}>
        <TipsSvg className={css.sidebar_icon} />
        <TipsSvg className={css.sidebar_icon} />
      </div>
    </div>
  );
};

export default Sidebar;
