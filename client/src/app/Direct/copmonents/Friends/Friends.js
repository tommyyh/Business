import React, { useEffect, useState } from 'react';
import { getFriendsList } from '../../../../helpers/helperFunctions';
import { Link } from 'react-router-dom';
import { get } from '../../../../lib/axios';
import Loading from '../../../../components/Loading/Loading';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getFriendsList();

      setFriends(res);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </div>
  );
};

export default Friends;

const Friend = ({ friend }) => {
  const [chat, setChat] = useState();

  useEffect(() => {
    getChat();
  }, []);

  const getChat = async () => {
    const res = await get(`/chat/get-chat-id/${friend.username}`);
    const { status, data } = res.data;

    if (status !== 200) return; // ERROR

    setChat(data);
  };

  return (
    <Link to={`/app/direct/${chat?.chat_id}`}>
      <img
        src={friend.profile_pic}
        alt='User Profile'
        style={{ width: '6rem', height: '6rem', borderRadius: '50%' }}
      />
      <p>{`${friend.name} ${friend.surname}`}</p>
    </Link>
  );
};
