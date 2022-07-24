import React from 'react';
import SecondCSS from './s.module.scss';
import Shapes from '../../../../assets/img/second_img.svg';

const Second = () => {
  return (
    <section className={SecondCSS.second_cont}>
      <div className={SecondCSS.second}>
        <img src={Shapes} alt='shapes' className={SecondCSS.shapes} />

        <div className={SecondCSS.second_text}>
          <h2>Id consectetur purus ut faucibus pulvinar</h2>
          <p>
            sit amet dictum sit amet justo donec enim diam vulputate ut pharetra
            sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra
            et
          </p>
        </div>
      </div>
    </section>
  );
};

export default Second;
