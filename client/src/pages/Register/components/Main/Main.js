import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './m.module.scss';
// <<<<<<< HEAD
import { post } from '../../../../lib/axios';
import defaultPic from '../../../../assets/img/user.png';
// =======
import axios from 'axios';
import Quote from './Quote'
import BG from '../../../../assets/img/right_bg.svg'
// >>>>>>> design

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
    // Convert Base64 to file -> send to server as default pic after registering
    const dataURLtoFile = (dataurl, filename) => {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    };

    const file = dataURLtoFile(defaultPic, 'default_pic.png');

    const data = new FormData();

    data.append('profilePic', file);
    data.append('name', values.name);
    data.append('surname', values.surname);
    data.append('username', values.username);
    data.append('dob', values.dob);
    data.append('email', values.email);
    data.append('password', values.password);
    data.append('confirm', values.confirm);

    const res = await post('/user/register/', data);

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
        </div>

        <div className={css.whole_section}>
          <div className={css.left_section}>
            <h1 className={css.signup_title}>Sign Up Page</h1>
            <p className={css.signup_par}>lacus sed turpis tincidunt id aliquet risus feugiat in ante </p>

            <div className={`${css.form1} ${css.active_form}`}>
              <div className={`${css.input_name} ${css.form}`}>
                <label className={`${css.label}`}>First Name</label>
                <input
                  className={`${css.fornename}`}
                  type='text'
                  placeholder='John'
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  value={values.name}
                />
              </div>

              <div className={`${css.input_surname} ${css.form}`}>
                <label className={`${css.label}`}>Last Name</label>
                <input
                  className={`${css.surname}`}
                  type='text'
                  placeholder='Fitz'
                  onChange={(e) =>
                    setValues({ ...values, surname: e.target.value })
                  }
                  value={values.surname}
                />
              </div>

              <div className={`${css.input_dob} ${css.form}`}>
                <label className={`${css.label}`}>Date of Birth</label>
                <input
                  className={`${css.dob}`}
                  type='date'
                  onChange={(e) => setValues({ ...values, dob: e.target.value })}
                />
              </div>

              <button className={`${css.continueBtn} ${css.form_btn}`}>Continue</button>
            </div>

            <div className={`${css.form2}`}>
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

              <div className={`${css.input_confirm} ${css.form}`}>
                <label className={`${css.label}`}>Confirm Password</label>
                <input
                  className={`${css.password}`}
                  type='password'
                  placeholder='Confirm Password'
                  onChange={(e) =>
                    setValues({ ...values, confirm: e.target.value })
                  }
                  value={values.confirm}
                />
              </div>

              <button className={`${css.signUpBtn} ${css.form_btn}`} onClick={submit}>Sign Up</button>
            </div>

            <div className={css.paginations}>
              <div className={`${css.pagination} ${css.active_pag}`}>1</div>
              <div className={`${css.pagination}`}>2</div>
            </div>

            {/* <div className={css.form2}></div> */}

          </div>

          <Quote widthSize="640px" heightSize="620px" title="Bond With people" par="“quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing”" img={BG} titleMargin="104px" contMargin="180px" parWidth="80%" infoWidth="30%"/>
        </div>
      </div>
    </main>
  );
};

export default Main;
