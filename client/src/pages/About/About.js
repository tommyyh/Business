import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from './components/Main/Main';
import Loading from '../../components/Loading/Loading';
import Story from './components/Story/Story';
import Whyus from './components/Whyus/Whyus';
import Quote from '../Register/components/Main/Quote'
import Cover from '../../assets/img/cover_quote.svg'
import Community from '../Home/components/Community/Community'
// import Promise from './components/Promise/Promise';

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });

    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <Main />
      <Story />
      <Whyus />
      {/* <Promise /> */}
      <Quote style={{marginTop: "290px"}} widthSize="100%" heightSize="720px" title="Our Promise To You" par="“quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing”" img={Cover} titleMargin="140px" contMargin="240px" parWidth="50%" infoWidth="14%" topMargin="200px"/>
      <Community />
      <Footer />
    </>
  );
};

export default About;
