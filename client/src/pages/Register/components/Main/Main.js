import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './m.module.scss';
import { post } from '../../../../lib/axios';

const Main = () => {
  const [error, setError] = useState('');
  const [errorClass, setErrorClass] = useState('error_closed');
  const [values, setValues] = useState({
    name: '',
    surname: '',
    username: '',
    dob: '',
    email: '',
    password: '',
    confirm: '',
  });
  const navigate = useNavigate();

  const submit = async () => {
    const res = await post('/user/register/', {
      name: values.name,
      surname: values.surname,
      username: values.username,
      dob: values.dob,
      email: values.email,
      password: values.password,
      confirm: values.confirm,
    });

    const { status, msg } = res.data;

    if (status === 400) {
      setError(msg);
      setErrorClass('error');
    } else {
      setErrorClass('error_closed');
      navigate('/login');
    }
  };

  return (
    <main className={css.main_cont}>
      <div className={css.main}>
        <h1>Sign Up Page</h1>
        <p>lacus sed turpis tincidunt id aliquet risus feugiat in ante </p>

        <div className={css[errorClass]}>
          <p>{error}</p>

          <div
            className={css.cross}
            onClick={() => setErrorClass('error_closed')}
          ></div>
        </div>

        <div className={css.form1}>
          <div className={css.input_name}>
            <label>First Name</label>
            <input
              type='text'
              placeholder='John'
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              value={values.name}
            />
          </div>

          <div className={css.input_surname}>
            <label>Last Name</label>
            <input
              type='text'
              placeholder='Fitz'
              onChange={(e) =>
                setValues({ ...values, surname: e.target.value })
              }
              value={values.surname}
            />
          </div>

          <div className={css.input_dob}>
            <label>Date of Birth</label>
            <input
              type='date'
              onChange={(e) => setValues({ ...values, dob: e.target.value })}
            />
          </div>
        </div>

        <div className={css.form2}>
          <div className={css.input_username}>
            <label>Username</label>
            <input
              type='text'
              placeholder='jacob2001'
              onKeyPress={(event) => {
                if (!/^[a-zA-Z0-9_]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>

          <div className={css.input_email}>
            <label>Email Address</label>
            <input
              type='text'
              placeholder='address@gmail.com'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              value={values.email}
            />
          </div>

          <div className={css.input_password}>
            <label>Password</label>
            <input
              type='password'
              placeholder='Your Password'
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              value={values.password}
            />
          </div>

          <div className={css.input_confirm}>
            <label>Confirm Password</label>
            <input
              type='password'
              placeholder='Confirm Password'
              onChange={(e) =>
                setValues({ ...values, confirm: e.target.value })
              }
              value={values.confirm}
            />
          </div>
        </div>

        <button onClick={submit}>Sign Up</button>

        <div className={css.form2}></div>
      </div>
    </main>
  );
};

export default Main;
