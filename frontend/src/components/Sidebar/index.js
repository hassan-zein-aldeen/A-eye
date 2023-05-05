import { useState } from "react";
import Logo from "../../images/EditedLogo.svg";
import Button1 from "../Button1/Button";
import "./sidebar.css";

const Sidebar = ({ activeLink, handleClick, handleAccSubClick }) => {
  const [activeSubLink, setActiveSubLink] = useState();

  const handleAll = (e) => {
    handleClick(e);
    handleSubClick(e);
  }

  const handleSubClick = (e) => {
    setActiveSubLink(e.target.dataset.target);
  };


  return (
    <div className="admin_sidebar">
      <a href="http://127.0.0.1:3001/Home">
        <img
          id="admin_logo"
          style={{ width: "11rem" }}
          src={Logo}
          alt="Admin Logo"
        />
      </a>
      <div className="admin_links">
        <a
          href="#requests"
          className={activeLink === "#requests" ? "active" : ""}
          onClick={handleClick}
          data-target="requests"
        >
          Requests
        </a>
        <div>
          <a
            href="#accounts"
            className={activeLink === "#accounts" ? "active" : ""}
            onClick={handleAll}
            data-target="accounts"
          >
            Accounts
          </a>
        </div>
        <a
          href="#s_notif"
          className={activeLink === "#s_notif" ? "active" : ""}
          onClick={handleClick}
          data-target="s_notif"
        >
          Message
        </a>
      </div>
      <Button1 id="Logout">Logout</Button1>
    </div>
  );
};

export default Sidebar;
