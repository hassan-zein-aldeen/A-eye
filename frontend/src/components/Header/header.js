import React from "react";
import Button1 from "../Button1/Button";
import Image from "../../images/logo.svg";
import './header.css';

const Header = () => {

  const handleClick = () => {
		window.location.href = "/login";
		localStorage.clear();
	};

  return (
    <div className="head">
      <img className="logo" src={Image} alt="logo" />
      <Button1 id="login" onClick={handleClick}>
        {localStorage.getItem("token")? "Logout": "Login"}</Button1>
    </div>
  );
};

export default Header

