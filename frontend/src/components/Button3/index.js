import React from 'react';
import './button3.css';

const Button3 = ({ children, onClick, disabled }) => {

  return (
    <button className="button3" onClick={onClick} disabled={disabled}>{children}
    </button>
  );
};

export default Button3