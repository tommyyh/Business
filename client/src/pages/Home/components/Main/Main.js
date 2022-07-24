import React from 'react';
import { Link } from 'react-router-dom';
import MainCSS from './m.module.scss';
import MainImg1 from '../../../../assets/img/main_img1.png';
import MainImg2 from '../../../../assets/img/main_img2.png';
import MainCircles1 from '../../../../assets/img/main_circles1.svg';
import MainCircles2 from '../../../../assets/img/main_circles2.svg';
import PhoneBubble from '../../../../assets/img/phone_bubble.svg';

const Main = () => {
  return (
    <main className={MainCSS.main_cont}>
      <div className={MainCSS.main}>
        <h1>Posuere urna nec tincidunt praesent semper feugiat</h1>
        <p>
          tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis
          tellus in metus vulputate eu
        </p>
        <Link className={MainCSS.btn} to=''>Join Us</Link>

        <div>
          <img src={MainImg1} alt='people img' className={MainCSS.main_img1} />
          <img src={MainImg2} alt='people img' className={MainCSS.main_img2} />
        </div>

        <div>
          <img
            src={MainCircles1}
            alt='circles'
            className={MainCSS.main_circles1}
          />
          <img
            src={MainCircles2}
            alt='circles'
            className={MainCSS.main_circles2}
          />

          <img src={PhoneBubble} alt="Bubble" className={MainCSS.phone_bubble1}></img>
          <div className={MainCSS.phone_bubble2}></div>
        </div>
      </div>
    </main>
  );
};

export default Main;
