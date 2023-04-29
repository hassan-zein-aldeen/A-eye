import React, { useState } from "react";
import axios from "./axios";
import Header from "../../components/Header/header";
import './addUser.css';
import Button1 from "../../components/Button1/Button";

const AddUser = () => {

  const [activeDiv, SetActiveDiv] = useState("requests");
  const [actveLink, SetActiveLink] = useState('#requests');
  const [role, setRole] = useState("");
  const [shopname, SetShopname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");


  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };



  function handleClick(event) {

    event.preventDefault();
    const target = event.target.getAttribute("data-target");
    SetActiveDiv(target);
    SetActiveLink(event.target.hash);
  }



  return (
    <div>
      <Header />
      <a id="back" href="http://localhost:3001/">Home</a>
      <div className="admin">

        <div className="feature">
          <a href="#requests" className={actveLink === '#requests' ? 'active' : ''} onClick={handleClick} data-target="requests" >Requests</a>
          <a href="#accounts" className={actveLink === '#accounts' ? 'active' : ''} onClick={handleClick} data-target="accounts" >Accounts</a>
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
                  <label for="shop_name">Shop Name: </label>
                  <label for="username">Username: </label>
                  <label for="password">Password: </label>
                  <label for="email">Email: </label>
                  <label for="phone">Phone Number: </label>
                  <label for="address">Address: </label>
                </div>
                <div className="inputs">
                  <input type="text" id="shop_name" placeholder="Enter user's shop name" />
                  <input type="text" id="username" placeholder="Enter username" />
                  <input type="text" id="password" placeholder="Enter password" />
                  <input type="email" id="email" placeholder="Enter user's email" />
                  <input type="text" id="phone" placeholder="example(00-000000)" />
                  <input type="text" id="address" placeholder="example(City/Mall/Floor)" />
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