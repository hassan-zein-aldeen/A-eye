import React, { useState } from "react";
import Header from "../../components/Header/header";
import './addUser.css';

const AddUser = () => {

  const [activeDiv, SetActiveDiv] = useState("create");

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
          <a href="#" onClick={handleClick} data-target="requests" >Requests</a>
          <a href="#" onClick={handleClick} data-target="accounts" >Accounts</a>
          <a href="#" onClick={handleClick} data-target="s_notif" >Send Notification</a>
        </div>
        <div className="admin_content">
          {activeDiv === "requests" && <div id="request">This is first section</div>}
          {activeDiv === "accounts" && <div id="account">
            <div className="acc_title">
              <p>Accounts</p>
              <a href="#" onClick={handleClick} data-target="create" style={{ color: "black" }}>Create User</a>
            </div>
          </div>}
          {activeDiv === "s_notif" && <div id="nofitication">This is third section</div>}
          {activeDiv === "create" && <div id="new_user">This is new user</div>}
        </div>
      </div>
    </div>
  );
}

export default AddUser