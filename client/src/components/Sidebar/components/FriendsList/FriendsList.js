import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import css from './f.module.scss';
import UserImg from '../../../../assets/img/user.png';
import { get, post } from '../../../../lib/axios';

const FriendsList = ({ friendsOpen, setAddOpen }) => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    getMyRequests();
    getFriendsList();
    setLoading(false);
  }, []);

  const getMyRequests = async () => {
    const res = await get('/user/my-requests/');
    const { data, status } = res.data;

    if (status !== 200) return;

    setFriendRequests(data);
  };

  const getFriendsList = async () => {
    const res = await get('/user/friends-list/');
    const { data, status } = res.data;

    if (status !== 200) return; // ERROR

    const array1 = [];
    const array2 = [];
    const array3 = [];

    data.forEach((x) => {
      array1.push(x.user);
    });
    array1.forEach((y) => {
      array2.push(y);
    });
    array2.forEach((q) =>
      array3.push(q.filter((f) => f.username !== user.username.payload)[0])
    );

    setFriends(array3);
  };

  const requestResponse = async (action, username, receiver) => {
    const res = await post('/user/request-response/', {
      action,
      username,
      receiver,
    });
    const { status, sender } = res.data;

    if (status === 400 || status === 401) return; // ERROR

    if (status === 200) setFriends([...friends, sender]);

    setFriendRequests((requests) =>
      requests.filter((x) => x.sender.username !== username)
    );
  };

  if (loading) return <h1>Loading</h1>;

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
          <div key={request.id}>
            <p>{request.sender.email}</p>
            <button
              onClick={() =>
                requestResponse(
                  'accept',
                  request.sender.username,
                  request.receiver.username
                )
              }
            >
              Accept
            </button>
            <button
              onClick={() =>
                requestResponse(
                  'reject',
                  request.sender.username,
                  request.receiver.username
                )
              }
            >
              Reject
            </button>
          </div>
        ))}

      {friends.map((friend) => (
        <div className={css.friends_block} key={friend.id}>
          <img src={UserImg} alt='user profile' className={css.user_profile} />
          <p>{`${friend.name} ${friend.surname}`}</p>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
