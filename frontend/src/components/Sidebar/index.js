import { useState } from "react";
import Logo from "../../images/EditedLogo.svg";
import Button1 from "../Button1/Button";
import "./sidebar.css";

const Sidebar = ({ activeLink, handleClick, handleDefaultClick }) => {
  const [activeSubLink, setActiveSubLink] = useState();

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('status');
    localStorage.removeItem('username');
    localStorage.removeItem('shopname');
    localStorage.removeItem('role');
    window.location.href = 'http://localhost:3001/login';
  }

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
          style={{ width: "9rem" }}
          src={Logo}
          alt="Admin Logo"
        />
      </a>
      <div className="admin_links">
        <a
          href="#isActive"
          className={activeLink === "#allads" ? "active" : ""}
          onClick={handleDefaultClick}
          data-target="isActive"
        >
          All Ads
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
      <Button1 onClick={logout} id="Logout">Logout</Button1>
    </div>
  );
};

export default Sidebar;
