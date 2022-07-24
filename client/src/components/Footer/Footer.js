import React from 'react';
import FooterCSS from './f.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className={FooterCSS.footer_cont}>
        <div className={FooterCSS.footer}>
          <div className={FooterCSS.footer_pillar}>
            <div className={FooterCSS.footer_pillar_top}>
              <h2>Logo</h2>
            </div>

            <div>
              <ul>
                <li>E: info@company.com</li>
                <li>T: 0000000 000</li>
              </ul>
            </div>
          </div>

          <div className={FooterCSS.footer_pillar}>
            <div className={FooterCSS.footer_pillar_top}>
              <h2>Links</h2>
            </div>

            <div>
              <ul>
                <li>
                  <Link to=''>About Us</Link>
                </li>
                <li>
                  <Link to=''>FAQ's</Link>
                </li>
                <li>
                  <Link to=''>Forums</Link>
                </li>
                <li>
                  <Link to=''>Terms & Services</Link>
                </li>
                <li>
                  <Link to=''>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={FooterCSS.footer_pillar}>
            <div className={FooterCSS.footer_pillar_top}>
              <h2>Socials</h2>
            </div>

            <div>
              <ul>
                <li>
                  <Link to=''>Instagram</Link>
                </li>
                <li>
                  <Link to=''>Facebook</Link>
                </li>
                <li>
                  <Link to=''>Twitter</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className={FooterCSS.footer_copyright}>
        <h3>All Rights Reserved &copy; 2022 </h3>
      </div>
    </>
  );
};

export default Footer;
