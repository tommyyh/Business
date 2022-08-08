import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import css from './f.module.scss';
import { get, post } from '../../../../lib/axios';
import Friend from '../Friend/Friend';
import { getFriendsList } from '../../../../helpers/helperFunctions';
import { v4 } from 'uuid';

const FriendsList = ({
  friendsOpen,
  setAddOpen,
  setSocket,
  socket,
  setMsg,
}) => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    // Join all users group to get requests and response
    const socket = new WebSocket(`ws://localhost:5000/ws/friend-actions/`);

    setSocket(socket);

    getMyRequests();
    myFriends();
    setLoading(false);
  }, []);

  const getMyRequests = async () => {
    const res = await get('/user/my-requests/');
    const { data, status } = res.data;

    if (status !== 200) return;

    setFriendRequests(data);
  };

  const myFriends = async () => {
    const res = await getFriendsList();

    setFriends(res);
  };

  const requestResponse = async (action, username, receiver) => {
    if (socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          action: 'response',
          userAction: action,
          sender: username,
          receiver,
        })
      );
    }
  };

  if (loading) return <h1>Loading</h1>;

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.action === 'send_request_add_yourself') {
      setMsg('Cannot add your own self');
    } else if (data.action === 'send_request_user_exists') {
      setMsg('User does not exists');
    } else if (data.action === 'send_request_exists') {
      setMsg('Already friends with this user');
    } else if (data.action === 'send_request') {
      if (data.stored_request.receiver.username === user.username.payload) {
        setFriendRequests([...friendRequests, data.stored_request]);
      }
    } else if (data.action === 'response') {
      setFriends([
        ...friends,
        data.stored_friendship.user.filter(
          (x) => x.username !== user.username.payload
        )[0],
      ]);

      setFriendRequests((requests) =>
        requests.filter(
          (x) =>
            x.sender.username === data.sender &&
            x.receiver.username === data.receiver
        )
      );
    } else if (data.action === 'reject') {
      setFriendRequests((requests) =>
        requests.filter((x) => x.receiver.username === data.sender)
      );
    }
  };

  return (
    <div
      className={
        friendsOpen
          ? `${css.friends_list} ${css.friends_list_open}`
          : css.friends_list
      }
    >
      <div className={css.friends_add_block} onClick={setAddOpen}>
        <p>Add a Friend</p>
      </div>

      {friendRequests &&
        friendRequests.map((request) => (
          <div key={v4()}>
            <p>{request.sender.email}</p>
            <button
              onClick={() => {
                requestResponse(
                  'accept',
                  request.sender.username,
                  request.receiver.username
                );
                setMsg('');
              }}
            >
              Accept
            </button>
            <button
              onClick={() => {
                requestResponse(
                  'reject',
                  request.sender.username,
                  request.receiver.username
                );
                setMsg('');
              }}
            >
              Reject
            </button>
          </div>
        ))}

      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          setFriends={setFriends}
          friends={friends}
        />
      ))}
    </div>
  );
};

export default FriendsList;
