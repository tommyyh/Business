import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import Main from './components/Main/Main';

const Login = () => {
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
    </>
  );
};

export default Login;
