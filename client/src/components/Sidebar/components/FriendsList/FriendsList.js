import React, { useEffect, useState } from 'react';
import css from './f.module.scss';
import UserImg from '../../../../assets/img/user.png';
import { get, post } from '../../../../lib/axios';

const FriendsList = ({ friendsOpen, setAddOpen }) => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyRequests();
    setLoading(false);
  }, []);

  const getMyRequests = async () => {
    const res = await get('/user/my-requests/');
    const { data, status } = res.data;

    if (status !== 200) return;

    setFriendRequests(data);
  };

  const requestResponse = async (action, username, receiver) => {
    const res = await post('/user/request-response/', {
      action,
      username,
      receiver,
    });
    const { status } = res.data;

    if (status !== 200) return; // ERROR

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

      {/* {friends.map((friend) => (
        <div className={css.friends_block} key={friend.id}>
          <img src={UserImg} alt='user profile' className={css.user_profile} />
          <p>{`${friend.name} ${friend.surname}`}</p>
        </div>
      ))} */}

      {/* <div className={css.friends_block}>
        <img src={UserImg} alt='user profile' className={css.user_profile} />
        <p>Shaq Oneil</p>
      </div> */}
    </div>
  );
};

export default FriendsList;
