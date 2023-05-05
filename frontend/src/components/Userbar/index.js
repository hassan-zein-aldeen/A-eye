import { useState } from "react";
import Logo from "../../images/EditedLogo.svg";
import Button1 from "../Button1/Button";
import "./userbar.css";

const Userbar = () => {

  const [activeDiv, setActiveDiv] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("data-target");
    setActiveDiv(target);
  }


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
          onClick={handleClick}
          data-target="ads"
        >
          Ads
        </a>
        <a
          href="#user_requests"
          onClick={handleClick}
          data-target="user_requests"
        >
          Requests
        </a>
        <a
          href="#user_messages"
          onClick={handleClick}
          data-target="user_messages"
        >
          Messages
        </a>
        <a
          href="#ai_tool"
          onClick={handleClick}
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
