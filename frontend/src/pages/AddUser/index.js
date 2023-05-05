import React, { useState, useEffect } from "react";
import axios from "axios";
import './addUser.css';
import Button1 from "../../components/Button1/Button";
import Message from "../../components/Message";
import Sidebar from "../../components/Sidebar";
import userIcon from "../../images/user.svg";

const AddUser = () => {

  const [activeDiv, setActiveDiv] = useState("requests");
  const [actveLink, setActiveLink] = useState('#requests');

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

  const [res_message, setRes_message] = useState("");

  const [users, setUsers] = useState([]);
  const [activeUsers, setactiveUsers] = useState([]);
  const [inActiveUsers, setinActiveUsers] = useState([]);

  const title_name = localStorage.getItem("shopname");


  const handleClick = async (event) => {
    event.preventDefault();
    const target = event.target.getAttribute("data-target");
    setActiveDiv(target);
    setActiveLink(event.target.hash);
    await getUsers(event);
    await getActiveUsers(event);
    await getInctiveUsers(event);
  }

  const getUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://127.0.0.1:3000/user/');
      const users = response.data;
      setUsers(users);
      const userIds = users.map(user => user._id);
    } catch (error) {
      console.log(error);
    }
  }

  const getActiveUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://127.0.0.1:3000/user/activeusers');
      const activeUsers = response.data;
      setactiveUsers(activeUsers);
    } catch (error) {
      console.log(error);
    }
  }

  const getInctiveUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://127.0.0.1:3000/user/inactiveusers');
      const inActiveUsers = response.data;
      setinActiveUsers(inActiveUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let timeout = null;
    if (res_message) { timeout = setTimeout(() => { setRes_message(''); }, 2000) }
    return () => { if (timeout) { clearTimeout(timeout); } };
  }, [res_message]);

  const addNewUser = async (e) => {
    e.preventDefault();

    seterrRole("");
    seterrShopname("");
    seterrUsername("");
    seterrPassword("");
    seterrEmail("");
    seterrAddress("");

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

    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    if (!email) {
      seterrEmail("email missing");
      return;
    } else if (!validateEmail(email)) {
      seterrEmail("Enter valid email")
      return;
    }

    if (!address) {
      seterrAddress("address missing");
      return;
    }

    const userData = {
      "role": role,
      "shopname": shopname,
      "username": username,
      "password": password,
      "email": email,
      "address": address,
    };

    try {
      const response = await axios.post('http://127.0.0.1:3000/auth/createUser', userData);
      const { user } = response.data;
      setRes_message("User Created Successfully");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setRes_message(error.response.data.message);
      } else {
        setRes_message("An error occurred while creating the user. Please try again later.");
      }
    }
  }

  const updateStatus = async (userId) => {
    try {
      const updatedUser = await axios.put(`http://127.0.0.1:3000/user/update/${userId}`);
      setRes_message("User Status updated Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="admin">
        <Sidebar activeLink={actveLink} handleClick={handleClick} />
        <div className="admin_content">
          {activeDiv === "requests" && <div id="request">First section</div>}
          {activeDiv === "s_notif" && <div id="nofitication">
            <Message />
          </div>}
          {activeDiv === "accounts" && <div id="account">
            <p className="shopname-title">Shopname: <span> {title_name}</span></p>
            <div className="display_users">
              <div className="acc_title">
                <div className="acc_sublinks">
                  <a href="#" onClick={handleClick} data-target="active_users">Active</a>
                  <a href="#" onClick={handleClick} data-target="inActive_users">Inactive</a>
                </div>
                <a id="create_user" href="#" onClick={handleClick} data-target="create">Create User</a>
              </div>
              <div>
                <table className="users_table">
                  <thead>
                    <tr className="col_titles">
                      <tr></tr>
                      <th>Username</th>
                      <th>Shop Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.map(user => (
                      <tr key={user._id}>
                        <td><img className="userimage" src={userIcon} /></td>
                        <td className="key">{user.username}</td>
                        <td>{user.shopname}</td>
                        <td id="last_bord">{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>}
          {activeDiv === "create" && <div id="new_user">
            <p className="shopname-title">Shopname: <span> {title_name}</span></p>
            <p className="form_title">New User</p>
            <div className="fields">
              <div className="user_type">
                <label> User type :
                  <input type="radio" name="type" value="user" id="user"
                    onChange={(e) => setRole(e.target.value)} />
                  User
                </label>
                <label>
                  <input type="radio" name="type" value="admin" id="admin"
                    onChange={(e) => setRole(e.target.value)} />
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
                  <input type="text" id="shop_name" placeholder="Enter user's shop name"
                    onChange={(e) => setShopname(e.target.value)} required />
                  <input type="text" id="username" placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)} />
                  <input type="text" id="password" placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)} />
                  <input type="email" id="email" placeholder="Enter user's email"
                    onChange={(e) => setEmail(e.target.value)} />
                  <input type="text" id="address" placeholder="example(City/Mall/Floor)"
                    onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
              <div className="valid_input">
                <span>{errrole}</span>
                <span>{errshopname}</span>
                <span>{errusername}</span>
                <span>{errpassword}</span>
                <span>{erremail}</span>
                <span>{erraddress}</span>
                <span className="response_result"
                  style={{
                    backgroundColor: res_message === "User Created Successfully" ? "green" : "red",
                    fontSize: "1.5rem",
                    borderRadius: "0.5rem"
                  }}>
                  {res_message && <p>{res_message}</p>}</span>
              </div>
              <Button1 onClick={addNewUser}>Create</Button1>
            </div>
          </div>}
          {activeDiv === "active_users" && <div id="active_user">
            <p className="shopname-title">Shopname: <span> {title_name}</span></p>
            <div className="display_users">
              <div className="acc_title">
                <div className="acc_sublinks">
                  <a href="#" onClick={handleClick} data-target="active_users">Active</a>
                  <a href="#" onClick={handleClick} data-target="inActive_users">Inactive</a>
                </div>
                <a id="create_user" href="#" onClick={handleClick} data-target="create">Create User</a>
              </div>
              <span className="response_result"
                style={{
                  backgroundColor: res_message === "User Status updated Successfully" ? "green" : "red",
                  color: "white",
                  fontSize: "1.5rem",
                }}>
                {res_message && <p>{res_message}</p>}</span>
              <table className="users_table">
                <thead>
                  <tr className="col_titles">
                    <th></th>
                    <th>Username</th>
                    <th>Shop Name</th>
                    <th >Email</th>
                  </tr>
                </thead>
                <tbody>
                  {activeUsers && activeUsers.map(activeUser => (
                    <tr key={activeUser._id}>
                      <td><img className="userimage" src={userIcon} /></td>
                      <td className="key">{activeUser.username}</td>
                      <td >{activeUser.shopname}</td>
                      <td >{activeUser.email}</td>
                      <td id="last_bord"><Button1 onClick={() => updateStatus(activeUser._id)}>Deactivate</Button1></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}
          {activeDiv === "inActive_users" && <div id="inactive_user">
            <p className="shopname-title">Shopname: <span> {title_name}</span></p>
            <div className="display_users">
              <div className="acc_title">
                <div className="acc_sublinks">
                  <a href="#" onClick={handleClick} data-target="active_users">Active</a>
                  <a href="#" onClick={handleClick} data-target="inActive_users">Inactive</a>
                </div>
                <a id="create_user" href="#" onClick={handleClick} data-target="create">Create User</a>
              </div>
              <span className="response_result"
                style={{
                  backgroundColor: res_message === "User Status updated Successfully" ? "green" : "red",
                  color: "white",
                  fontSize: "1.5rem",
                }}>
                {res_message && <p>{res_message}</p>}</span>
              <table className="users_table">
                <thead>
                  <tr className="col_titles">
                    <th></th>
                    <th>Username</th>
                    <th>Shop Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {inActiveUsers && inActiveUsers.map(inActiveUser => (
                    <tr key={inActiveUser._id}>
                      <td><img className="userimage" src={userIcon} /></td>
                      <td className="key">{inActiveUser.username}</td>
                      <td>{inActiveUser.shopname}</td>
                      <td>{inActiveUser.email}</td>
                      <td><Button1 onClick={() => updateStatus(inActiveUser._id)}>Activate</Button1></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default AddUser