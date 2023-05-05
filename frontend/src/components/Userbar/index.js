import { useState } from "react";
import Logo from "../../images/EditedLogo.svg";
import Button1 from "../Button1/Button";
import "./userbar.css";

const Userbar = ({handleAnchorClick}) => {


  return (
    <div className="user_sidebar">
      <a href="http://127.0.0.1:3001/Home">
        <img
          id="admin_logo"
          style={{ width: "11rem" }}
          src={Logo}
          alt="Admin Logo"
        />
      </a>
      <div className="user_links">
        <a
          href="#ads"
          onClick={(e) => handleAnchorClick(e, "ads")}
          data-target="ads"
        >
          Ads
        </a>
        <a
          href="#user_requests"
          onClick={(e) => handleAnchorClick(e, "user_requests")}
          data-target="user_requests"
        >
          Requests
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
      <Button1 id="Logout">Logout</Button1>
    </div>
  );
};

export default Userbar;
