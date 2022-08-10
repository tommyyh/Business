import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import css from './m.module.scss';
import { post } from '../../../../lib/axios';
import { useDispatch } from 'react-redux';
import {
  setDob,
  setEmail,
  setName,
  setSurname,
  login,
  setUsername,
  setProfilePic,
} from '../../../../features/user/userSlice';
import Quote from '../../../Register/components/Main/Quote'
import BG from '../../../../assets/img/right_bg.svg'

const Main = () => {
  const [error, setError] = useState('');
  const [errorClass, setErrorClass] = useState('error_closed');
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    const res = await post('/user/login/', {
      email: values.email,
      password: values.password,
    });

    const { status, msg, name, surname, dob, email, username, profile_pic } =
      res.data;

    if (status === 400) {
      setError(msg);
      setErrorClass('error');
    } else {
      dispatch(setName(name));
      dispatch(setSurname(surname));
      dispatch(setUsername(username));
      dispatch(setEmail(email));
      dispatch(setDob(dob));
      dispatch(setProfilePic(profile_pic));
      dispatch(login());

      navigate('/app');
    }
  };

  return (

    <main className={css.main_cont}>
      <div className={css.main}>
        <div className={css[errorClass]}>
          <p>{error}</p>

          <div
            className={css.cross}
            onClick={() => setErrorClass('error_closed')}
          ></div>
        </div>
        <div className={css.whole_section}>
          <div className={css.left_section}>
            <h1>Login page</h1>
            <p>lacus sed turpis tincidunt id aliquet risus feugiat in ante </p>

            <div className={`${css.form1} ${css.form_cont}`}>
              <div className={`${css.input_email} ${css.form}`}>
                <label className={`${css.label}`}>Email Address</label>
                <input
                  className={`${css.email}`}
                  type='text'
                  placeholder='address@gmail.com'
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  value={values.email}
                />
              </div>

              <div className={`${css.input_password} ${css.form}`}>
                <label className={`${css.label}`}>Password</label>
                <input
                  className={`${css.password}`}
                  type='password'
                  placeholder='Your Password'
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  value={values.password}
                />
              </div>

              <button className={`${css.loginBtn  } ${css.form_btn}`} onClick={submit}>Login</button>
            </div>
          </div>


        <button onClick={submit}>Login</button>

        <p>
          Don't have an account yet? <Link to='/sign-up'>Register</Link>
        </p>

          <Quote widthSize="640px" heightSize="620px" title="Bond With people" par="“quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing”" img={BG} titleMargin="104px" contMargin="180px" parWidth="80%" infoWidth="30%"/>
        </div>

      </div>
    </main>
  );
};

export default Main;
