import React from "react";
import "./sidebar.css";
import Logo from "../../images/EditedLogo.svg";
import Button1 from "../Button1/Button";

const Sidebar = ({ activeLink, handleClick }) => {

  return (
    <div className="admin_sidebar">
      <a href="http://127.0.0.1:3001/Home">
        <img id="admin_logo" style={{ width: "11rem" }} src={Logo} alt="Admin Logo" />
      </a>
      <div className="admin_links">
        <a href="#requests"
          className={activeLink === '#requests' ? 'active' : ''}
          onClick={handleClick} data-target="requests">
          Requests
        </a>
        <a href="#accounts"
          className={activeLink === '#accounts' ? 'active' : ''}
          onClick={handleClick} data-target="accounts">
          Accounts
        </a>
        <a href="#s_notif" onClick={handleClick} data-target="s_notif">
          Message
        </a>
      </div>
        <Button1 id="Logout">Logout</Button1>
    </div>
  );
}

export default Sidebar;