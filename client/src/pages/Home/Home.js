import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from './components/Main/Main';
import Second from './components/Second/Second';
import Community from './components/Community/Community';
import Loading from '../../components/Loading/Loading';

const Home = () => {
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
      <Second />
      <Community />
      <Footer />
    </>
  );
};

export default Home;
