import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from './components/Main/Main';
import Loading from '../../components/Loading/Loading';
import Story from './components/Story/Story';
import Whyus from './components/Whyus/Whyus';
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
      <Footer />
    </>
  );
};

export default About;
