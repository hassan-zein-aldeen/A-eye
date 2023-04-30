import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header/header";
import './addUser.css';
import Button1 from "../../components/Button1/Button";

const AddUser = () => {

  const [activeDiv, SetActiveDiv] = useState("requests");
  const [actveLink, SetActiveLink] = useState('#requests');

  const [role, setRole] = useState("");
  const [shopname, setShopname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [errrole, seterrRole] = useState("");
  const [errshopname, seterrShopname] = useState("");
  const [errusername, seterrUsername] = useState("");
  const [errpassword, seterrPassword] = useState("");
  const [erremail, seterrEmail] = useState("");
  const [erraddress, seterrAddress] = useState("");

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const addNewUser = async (e) => {
    e.preventDefault();

    const form = e.target;
    seterrRole("");
    seterrShopname("");
    seterrUsername("");
    seterrPassword("");
    seterrEmail("");
    seterrAddress("");
    e.preventDefault();

    if (!role) {
      seterrRole("user's role is missing");
      return;
    }

    if (!shopname) {
      seterrShopname("shopname missing");
      return;
    }

    if (!username) {
      seterrUsername("username missing");
      return;
    }

    if (password.length < 6) {
      seterrPassword("password at least 6 characters");
      return;
    }

    if (!email) {
      seterrEmail("email missing");
    } else if (!validateEmail(email)) {
      seterrEmail("Enter valid email")
    }

    if (!address) {
      seterrAddress("address missing");
      return;
    }
    console.log(role)
    console.log(shopname)
    console.log(username)
    console.log(email)
    console.log(address)

    const userData = {
      "role": role,
      "shopname": shopname,
      "username": username,
      "password":password,
      "email":email,
      "address":address,
    };


    try {
      const response = await axios.post('http://127.0.0.1:3000/auth/createUser', userData);
      console.log("test" + userData);
      const { user } = response.data;
      console.log("created succ", user);
      window.location.href = "/";
    } catch (error) {
      console.log(error)
    }

  }

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
                  <input type="radio" name="type" value="user" id="user" onChange={(e) => setRole(e.target.value)} />
                  User
                </label>
                <label>
                  <input type="radio" name="type" value="admin" id="admin" onChange={(e) => setRole(e.target.value)} />
                  Admin
                </label>
              </div>
              <div className="add_form">
                <div className="labels">
                  <label for="shop_name">Shop Name: </label>
                  <label for="username">Username: </label>
                  <label for="password">Password: </label>
                  <label for="email">Email: </label>
                  <label for="address">Address: </label>
                </div>
                <div className="inputs">
                  <input type="text" id="shop_name" placeholder="Enter user's shop name" onChange={(e) => setShopname(e.target.value)} required />
                  <input type="text" id="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                  <input type="text" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                  <input type="email" id="email" placeholder="Enter user's email" onChange={(e) => setEmail(e.target.value)} />
                  <input type="text" id="address" placeholder="example(City/Mall/Floor)" onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
              <div className="valid_input">
                <span>{errrole}</span>
                <span>{errshopname}</span>
                <span>{errusername}</span>
                <span>{errpassword}</span>
                <span>{erremail}</span>
                <span>{erraddress}</span>
              </div>
              <Button1 onClick={addNewUser}>Create</Button1>
            </div>
          </div>}
        </div>

      </div>
    </div>
  );
}

export default AddUser