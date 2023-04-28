import React, { useState } from "react";
import Header from "../../components/Header/header";
import './addUser.css';
import Button1 from "../../components/Button1/Button";

const AddUser = () => {

  const [activeDiv, SetActiveDiv] = useState("requests");
  const [actveLink,SetActiveLink] = useState('#requests');

  function handleClick(event) {

    event.preventDefault();
    const target = event.target.getAttribute("data-target");
    SetActiveDiv(target);
    SetActiveLink(event.target.hash);
  }



  return (
    <div>
      <Header />
      <a id="back" href="http://localhost:3000/">Home</a>
      <div className="admin">

        <div className="feature">
          <a href="#requests" className={actveLink==='#requests'? 'active':''} onClick={handleClick} data-target="requests" >Requests</a>
          <a href="#accounts" className={actveLink==='#accounts'? 'active':''} onClick={handleClick} data-target="accounts" >Accounts</a>
          <a href="#s_notif" onClick={handleClick} data-target="s_notif" >Send Notification</a>
        </div>

        <div className="admin_content">
          {activeDiv === "requests" && <div id="request">This is first section</div>}
          {activeDiv === "s_notif" && <div id="nofitication">This is third section</div>}
          {activeDiv === "accounts" && <div id="account">
            <div className="acc_title">
              <p>Accounts</p>
              <a id="create_user" href="#" onClick={handleClick} data-target="create">Create User</a>
            </div>
          </div>}
          {activeDiv === "create" && <div id="new_user">
          <p className="form_title">New User</p>
            <div className="fields">
              <div className="user_type">
                <label>
                  <input type="radio" name="type" value="user" id="user" />
                  User
                </label>
                <label>
                  <input type="radio" name="type" value="admin" id="admin" />
                  Admin
                </label>
              </div>
              <div className="add_form">
                <div className="labels">
                  <label for="email">Email: </label>
                  <label for="name">Name: </label>
                  <label for="phone">Phone Number: </label>
                </div>
                <div className="inputs">
                  <input type="text" id="name" placeholder="Enter User's Name" />
                  <input type="email" id="email" placeholder="Enter User's Email" />
                  <input type="text" id="phone" placeholder="example(00-000000)"></input>
                </div>
              </div>
              <Button1>Create</Button1>
            </div>
          </div>}
        </div>

      </div>
    </div>
  );
}

export default AddUser