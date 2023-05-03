import React from 'react';
import './button.css';

const Button1 = ({ children, onClick, disabled }) => {

  return (
    <button className="button1" onClick={onClick} disabled={disabled}>{children}
    </button>
  );
};

export default Button1