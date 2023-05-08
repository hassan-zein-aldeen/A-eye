import React from "react";
import "./textContent.css";
import {useState, useEffect} from "react";

const TextContent = ({ txtC1, iconC1, linkC1 }) => {

  const [isLoggedIn, setIsloggedIn] = useState(false);

  const handleRedirectAd = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      window.location.href = "http://localhost:3001/User/";
    } else {
      window.location.href = "http://localhost:3001/login";
    }
  }


  const handleLogout = () => {
    setIsloggedIn(false);
    localStorage.removeItem("token");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsloggedIn(true);
    }
  }, []);



  return (
    <div className="info">
      <p className="info_desc" dangerouslySetInnerHTML={{ __html: txtC1 }}></p>
      <div>
        <a id="j_link" href="http://localhost:3000/" onClick={handleRedirectAd}>
          <img src={iconC1} alt="icon" />
          {linkC1}</a>
      </div>
    </div>
  );
}

export default TextContent;