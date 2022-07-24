import React from 'react';
import css from './f.module.scss';

const Form = ({ type, placeholder, onChange, value, className, name }) => {
  return (
    <div className={`${css.signup_input} ${css.className}`}>
      <label>{name}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Form;
