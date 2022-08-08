import React, { useEffect, useState } from 'react';
import css from './a.module.scss';
import { post } from '../../../../lib/axios';
import Loading from '../../../../components/Loading/Loading';
import { useSelector } from 'react-redux';

const Add = ({ setAddOpen, socket, msg, setMsg }) => {
  const [username, setUsername] = useState('shaq420');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    setLoading(false);
  }, []);

  const submit = async () => {
    if (loading) return setMsg('Please wait');

    setProcessing(true);

    if (socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          sender: user.username.payload,
          receiver: username,
          action: 'send-request',
        })
      );
    }

    setProcessing(false);
  };

  if (loading) return <Loading />;

  return (
    <div className={css.add}>
      <div className={css.add_inner}>
        <h4 onClick={setAddOpen}>Add a Friend - Close</h4>
        <p>Enter user's email address to add him/her</p>
        <input
          type='text'
          placeholder='Email Address'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button onClick={submit} disabled={processing}>
          {processing ? 'Processing' : 'Add Friend'}
        </button>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};

export default Add;
