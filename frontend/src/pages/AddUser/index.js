import React, { useState } from "react";
import Header from "../../components/Header/header";
import './addUser.css';

const AddUser = () => {

  const [activeDiv, SetActiveDiv] = useState("");

  function handleClick(event) {
    event.preventDefault();
    const target = event.target.getAttribute("data-target");
    SetActiveDiv(target);
  }

  return (
    <div>
      <Header />
      <a id="back" href="http://localhost:3000/">Home</a>
      <div className="admin">
        <div className="feature">
          <a id="requests" href="#" onClick={handleClick} data-target="div1" >Requests</a>
          <a id="accounts" href="#" onClick={handleClick} data-target="div2" >Accounts</a>
          <a id="s_notif" href="#" onClick={handleClick} data-target="div3" >Send Notification</a>
        </div>
        <div className="admin_content">
          {activeDiv === "div1" && <div id="div1">This is div1</div>}
          {activeDiv === "div2" && <div id="div2">This is div2</div>}
          {activeDiv === "div3" && <div id="div3">This is div3</div>}
        </div>
      </div>
    </div>
  );
}

export default AddUser