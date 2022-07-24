import React from 'react';
import { Link } from 'react-router-dom';
import MainCSS from './m.module.scss';
import Circle from '../../../../assets/img/about_circle.png';

const Main = () => {
  return (
    <main className={MainCSS.main_cont}>
      <div className={MainCSS.main}>
        <img src={Circle} alt='circle' />

        <div className={MainCSS.main_right}>
          <h1>Pea consectetur purus ut faucibus pulvinar</h1>

          <p>
            vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi
            pharetra vulputate ut pharetra.
          </p>

          <Link to={''}>Learn More</Link>
        </div>
      </div>
    </main>
  );
};

export default Main;
