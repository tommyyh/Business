import React from 'react';
import { Link } from 'react-router-dom';
import CommunityCSS from './c.module.scss';
import Community1 from '../../../../assets/img/community1.svg';
import Community2 from '../../../../assets/img/community2.svg';
import Community3 from '../../../../assets/img/community3.svg';

const Community = () => {
  return (
    <section className={CommunityCSS.community_cont}>
      <div className={CommunityCSS.community}>
        <h2>Join Our Community</h2>

        <div className={CommunityCSS.community_mid}>
          <div className={CommunityCSS.community_pillar}>
            <img src={Community1} alt='secure registration' />

            <span>
              <h3>1. Create an account</h3>
              <p>
                gravida cum sociis natoque penatibus et magnis dis parturient
                montes nascetur ridiculus mus sociis natoque penatibus
              </p>
            </span>
          </div>

          <div className={CommunityCSS.community_pillar}>
            <img src={Community2} alt='connection between people' />

            <span>
              <h3>2. Connect with people</h3>
              <p>
                gravida cum sociis natoque penatibus et magnis dis parturient
                montes nascetur ridiculus mus sociis natoque penatibus
              </p>
            </span>
          </div>

          <div className={CommunityCSS.community_pillar}>
            <img src={Community3} alt='explore with others' />

            <span>
              <h3>3. Explore with others</h3>
              <p>
                gravida cum sociis natoque penatibus et magnis dis parturient
                montes nascetur ridiculus mus sociis natoque penatibus
              </p>
            </span>
          </div>
        </div>

        <Link to=''>Join Us</Link>
      </div>
    </section>
  );
};

export default Community;
