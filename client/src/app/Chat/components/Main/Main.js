import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../../../../lib/axios';
import Loading from '../../../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import Layout from '../Layout/Layout';

const Main = () => {
  const [chat, setChat] = useState();
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const logged_user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    const getChat = async () => {
      const res = await get(`/chat/get-chat/${id}/`);
      const { status, data } = res.data;

      if (status === 404) return navigate('/app/direct');

      setChat({
        ...data,
        chat_user: data.chat_user.filter(
          (user) => user.username !== logged_user.username.payload
        ),
      });
      setMessages(data.chat);

      const socket = new WebSocket(`ws://localhost:5000/ws/chat/${id}/`);

      setSocket(socket);
      setLoading(false);
    };

    getChat();
  }, []);

  if (loading) return <Loading />;

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);

    setMessages([...messages, data]);
  };

  return (
    <div>
      <h1>{`${chat?.chat_user[0].name} ${chat?.chat_user[0].surname}`}</h1>
      <Layout socket={socket} user={logged_user} id={id} />
      {messages.map((msg) => (
        <Message
          profilePic={msg.user_message.profile_pic}
          fullName={`${msg.user_message.name} ${msg.user_message.surname}`}
          msg={msg.message}
          sentAt={msg.sentAt}
        />
      ))}
    </div>
  );
};

export default Main;

const Message = ({ profilePic, fullName, msg, sentAt }) => {
  const sentAtTime = sentAt.split('T')[1].split(':');

  return (
    <div>
      <img
        src={profilePic}
        alt='User profile'
        style={{ width: '4rem', height: '4rem', borderRadius: '50%' }}
      />
      <h3>
        {fullName}:
        {`${sentAt.split('T')[0]}: ${sentAtTime[0]}:${sentAtTime[1]}`}
      </h3>
      <p>{msg}</p>
    </div>
  );
};
