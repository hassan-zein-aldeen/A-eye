import { useState } from "react";
import Logo from "../../images/EditedLogo.svg";
import Button1 from "../Button1/Button";
import "./userbar.css";

const Userbar = ({ handleAnchorClick }) => {


  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('status');
    localStorage.removeItem('username');
    localStorage.removeItem('shopname');
    localStorage.removeItem('role');
    window.location.href = 'http://localhost:3001/login';
  }

  return (
    <div className="user_sidebar">
      <a href="http://127.0.0.1:3001/Home">
        <img
          id="admin_logo"
          style={{ width: "2rem" }}
          src={Logo}
          alt="Admin Logo"
        />
      </a>
      <div className="user_links">
        <a
          href="#user_adver"
          onClick={(e) => {
            handleAnchorClick(e, "user_adver");
          }
          }
          data-target="user_adver"
        >
          Ads
        </a>
        <a
          href="#user_messages"
          onClick={(e) => handleAnchorClick(e, "user_messages")}
          data-target="user_messages"
        >
          Messages
        </a>
        <a
          href="#ai_tool"

          onClick={(e) => handleAnchorClick(e, "ai_tool")}
          data-target="ai_tool"
        >
          AI - Tool
        </a>
      </div>
      <Button1 onClick={logout} id="Logout">Logout</Button1>
    </div>
  );
};

export default Userbar;
