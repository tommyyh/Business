import React, { useState } from 'react';
import css from './a.module.scss';
import { post } from '../../../../lib/axios';

const Add = ({ setAddOpen }) => {
  const [username, setUsername] = useState('mike123');
  const [msg, setMsg] = useState('');
  const [processing, setProcessing] = useState(false);

  const submit = async () => {
    setProcessing(true);
    setMsg('');

    const res = await post('/user/send-request/', {
      username: username,
    });

    if (res.data.status === 400) {
      setProcessing(false);
      setMsg(res.data.msg);

      return;
    }

    setMsg('Friend request sent');
    setProcessing(false);
  };

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