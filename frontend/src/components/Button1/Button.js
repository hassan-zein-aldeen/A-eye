import React from 'react';
import './button.css';

const Button1 = ({ children, onClick }) => {

  return (
    <button className="button1" onClick={onClick}>{children}
    </button>
  );
};

export default Button1