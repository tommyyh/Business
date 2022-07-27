import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './m.module.scss';
import axios from 'axios';
import Quote from './Quote'
import BG from '../../../../assets/img/right_bg.svg'

const Main = () => {
  const [error, setError] = useState('');
  const [errorClass, setErrorClass] = useState('error_closed');
  const [values, setValues] = useState({
    name: '',
    surname: '',
    dob: '',
    email: '',
    password: '',
    confirm: '',
  });
  const navigate = useNavigate();

  const submit = async () => {
    const res = await axios.post('/user/register/', {
      name: values.name,
      surname: values.surname,
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
        <div className={css[errorClass]}>
          <p>{error}</p>

          <div
            className={css.cross}
            onClick={() => setErrorClass('error_closed')}
          ></div>
        </div>
        <div className={css.whole_section}>
          <div className={css.left_section}>
            <h1 className={css.signup_title}>Sign Up Page</h1>
            <p className={css.signup_par}>lacus sed turpis tincidunt id aliquet risus feugiat in ante </p>

            <div className={`${css.form1} ${css.form_cont}`}>
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

            <div className={`${css.form2} ${css.form_cont}`}>
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
