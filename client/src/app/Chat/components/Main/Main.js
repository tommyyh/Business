import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../../../lib/axios';
import Loading from '../../../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import Layout from '../Layout/Layout';

const Main = () => {
  const [chat, setChat] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const logged_user = useSelector((state) => state.user.value);

  useEffect(() => {
    const getChat = async () => {
      const res = await get(`/chat/get-chat/${id}/`);
      const { status, data } = res.data;

      if (status !== 200) return; // ERROR

      setChat({
        ...data,
        chat_user: data.chat_user.filter(
          (user) => user.username !== logged_user.username.payload
        ),
      });
    };

    getChat();
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h1>{`${chat?.chat_user[0].name} ${chat?.chat_user[0].surname}`}</h1>
      <Layout />
    </div>
  );
};

export default Main;
