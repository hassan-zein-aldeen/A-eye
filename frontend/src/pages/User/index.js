import React, { useState } from "react";
import "./user.css";
import Userbar from "../../components/Userbar";


const User = () => {
  const [activeDiv, setActiveDiv] = useState('')

  const handleAnchorClick = (e, target) => {
    e.preventDefault();
    setActiveDiv(target);
  };

  return (
    <div>
      <div className="all_page">
        <div className="userbar">
          <Userbar handleAnchorClick={handleAnchorClick} />
        </div>
        <div className="content">
          {activeDiv === "ads" && <div id="ads" style={{ color: "black" }}>
            Hello from Creating ads
          </div>}
        </div>
      </div>
    </div>
  );
}

export default User;