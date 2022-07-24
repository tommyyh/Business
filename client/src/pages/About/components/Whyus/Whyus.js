import React from 'react';
import WhyusCSS from './w.module.scss';
import AboutStory from '../../../../assets/img/about_story.png';
import { Link } from 'react-router-dom';

const Whyus = () => {
  return (
    <section className={WhyusCSS.whyus_cont}>
      <div className={WhyusCSS.whyus}>
        <h2 className={WhyusCSS.whyus_title}>Why Use Our Product?</h2>

        <div className={WhyusCSS.whyus_boxes}>
          <div className={WhyusCSS.whyus_box} style={{ borderRadius: "20px 20px 20px 0px", }}>
            <div className={WhyusCSS.whyus_box_top}>
              <div className={WhyusCSS.whyus_box_img}></div>
              <h3 className={WhyusCSS.whyus_box_title}>Dummy Text</h3>
            </div>
            <p className={WhyusCSS.whyus_box_text}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, doloremque aut enim, obcaecati, earum ipsa error sequi ea eveniet veniam totam eos nobis.</p>
          </div>

          <div className={WhyusCSS.whyus_box} style={{ borderRadius: "20px", }}>
            <div className={WhyusCSS.whyus_box_top}>
              <div className={WhyusCSS.whyus_box_img}></div>
              <h3 className={WhyusCSS.whyus_box_title}>Dummy Text</h3>
            </div>
            <p className={WhyusCSS.whyus_box_text}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, doloremque aut enim, obcaecati, earum ipsa error sequi ea eveniet veniam totam eos nobis.</p>
          </div>

          <div className={WhyusCSS.whyus_box} style={{ borderRadius: "20px 20px 0px 20px", }}>
            <div className={WhyusCSS.whyus_box_top}>
              <div className={WhyusCSS.whyus_box_img}></div>
              <h3 className={WhyusCSS.whyus_box_title}>Dummy Text</h3>
            </div>
            <p className={WhyusCSS.whyus_box_text}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, doloremque aut enim, obcaecati, earum ipsa error sequi ea eveniet veniam totam eos nobis.</p>
          </div>
        </div>

        <Link className={WhyusCSS.whyus_link} to={''}>Join Us</Link>
      </div>
    </section>
  );
};

export default Whyus;
