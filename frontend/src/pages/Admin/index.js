import React, { useState, useEffect } from "react";
import axios from "axios";
import './addUser.css';
import Button1 from "../../components/Button1/Button";
import Message from "../../components/Message";
import Sidebar from "../../components/Sidebar";
import userIcon from "../../images/user.svg";
import Button2 from "../../components/Button2";
import Button3 from "../../components/Button3";

const Admin = () => {

  const [activeDiv, setActiveDiv] = useState("requests"); // request ads

  const [actveLink, setActiveLink] = useState('#requests');

  const [role, setRole] = useState("");
  const [shopname, setShopname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");

  const [createUserErr, setCreateUserErr] = useState("");

  const [res_message, setRes_message] = useState("");
  const [activeAnchor, setActiveAnchor] = useState("users");

  const [pendingResults, setPendingResults] = useState("");
  const [activeResults, setActiveResults] = useState("");
  const [inActiveResults, setinActiveResults] = useState("");
  const [rejectedResults, setRejectedResults] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [users, setUsers] = useState([]);
  const [activeUsers, setactiveUsers] = useState([]);
  const [inActiveUsers, setinActiveUsers] = useState([]);

  const title_name = localStorage.getItem("shopname");
  const [userReqResult, setUserReqResult] = useState([{
    "_id": "",
    "title": "",
    "gender": "",
    "age": "",
    "description": "",
    "status": "",
    "user": "",
    "timeReq": "",
    "image": "",
    "__v": 0
  }
  ]);

  const handleSubUserAccounts = (e, target) => {
    e.preventDefault();
    setActiveAnchor(target)
  }


  useEffect(() => {
  }, [activeDiv, activeAnchor]);

  const handleCreateUserAccounts = (e, target) => {
    e.preventDefault();
    const newTarget = e.target.getAttribute("data-target");
    setActiveAnchor(newTarget);
    setActiveDiv(newTarget);
  }

  const handleDefaultClick = (e) => {
    const target = e.target.getAttribute("data-target");
    setActiveDiv(target);
    setActiveLink(e.target.hash);
    setIsActive(true);
  }

  const handleClick = async (event) => {
    const target = event.target.getAttribute("data-target");
    setActiveDiv(target);
    console.log(target)
    setActiveLink(event.target.hash);
    setActiveAnchor('users');
    await getUsers(event);
    await getActiveUsers(event);
    await getInctiveUsers(event);
    setIsActive(false);
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

  useEffect(() => {
    let timeout = null;
    if (createUserErr) { timeout = setTimeout(() => { setCreateUserErr(''); }, 2000) }
    return () => { if (timeout) { clearTimeout(timeout); } };
  }, [createUserErr]);

  const addNewUser = async (e) => {
    e.preventDefault();

    setCreateUserErr("");

    if (!role) {
      setCreateUserErr("user's role is missing");
      return;
    }

    if (!shopname) {
      setCreateUserErr("shopname missing");
      return;
    }

    if (!username) {
      setCreateUserErr("username missing");
      return;
    }

    if (password.length < 6) {
      setCreateUserErr("password at least 6 characters");
      return;
    }

    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    if (!email) {
      setCreateUserErr("email missing");
      return;
    } else if (!validateEmail(email)) {
      setCreateUserErr("Enter valid email")
      return;
    }

    if (!address) {
      setCreateUserErr("address missing");
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
        setActiveDiv('displayAccounts');
      }, 2000);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setRes_message(error.response.data.message);
      } else {
        setRes_message("An error occurred while creating the user. Please try again later.");
      }
    }
  }

  const handleMyAdsClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("data-target");
    setIsActive(false);
    setActiveDiv(target);
  }

  const updateStatus = async (userId) => {
    console.log(userId)
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

  const getAllRequests = async (e) => {

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }

    try {
      const response = await axios.get("http://127.0.0.1:3000/ads/allads", config)
      const usersRequests = response.data;
      setUserReqResult(usersRequests);
      console.log(usersRequests);
      const pend = usersRequests.filter(result => result.status === 'pending');
      setPendingResults(pend);
      const active = usersRequests.filter(result => result.status === 'active');
      setActiveResults(active);
      const inActive = usersRequests.filter(result => result.status === 'inactive');
      setinActiveResults(inActive);
      const rejected = usersRequests.filter(result => result.status === 'rejected');
      setRejectedResults(rejected);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const usersRequests = await getAllRequests();
        setResult(usersRequests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const acceptAd = async (adId) => {

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }

    try {
      const activateAd = await axios.put(`http://127.0.0.1:3000/ads/accept/${adId}`, {}, config);
      setRes_message("see here");
      console.log(res_message);
      console.log("this is Activated");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const rejectAd = async (adId) => {

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }

    try {
      const rejectAd = await axios.put(`http://127.0.0.1:3000/ads/reject/${adId}`, {}, config);
      setRes_message("see here");
      console.log(res_message);
      console.log("this is rejected");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const deActivate = async (adId) => {

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }

    try {
      const deactivated = await axios.put(`http://127.0.0.1:3000/ads/adminDeactivate/${adId}`, {}, config);
      setRes_message("see here");
      console.log(res_message);
      console.log("this is rejected");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const newhandleclick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("data-target");
  }



  return (
    <div>
      <div className="admin">
        <Sidebar activeLink={actveLink} handleClick={handleClick} handleDefaultClick={handleDefaultClick} />
        <div className="admin_content">

          {activeDiv != "displayAccounts" && <div>
            {activeDiv != "s_notif" && <div>
              {activeDiv != "createNewUser" && <div>
                <div className="AllUserrequests">
                  <p className="titlesectionAds">All Users' Ads</p>
                  <div className="directionalAdmin_links">
                    <a href="#"
                      onClick={(e) => { handleClick(e); getAllRequests(e) }} data-target="activeAds">Active</a>
                    <a href="#"
                      onClick={(e) => { handleClick(e); getAllRequests(e) }} data-target="pendingAds">Pending</a>
                    <a href="#"
                      onClick={(e) => { handleClick(e); getAllRequests(e) }} data-target="inActiveAds">InActive</a>
                    <a href="#"
                      onClick={(e) => { handleClick(e); getAllRequests(e) }} data-target="rejectedAds">Rejected</a>
                  </div>
                  {isActive && <div className="isActive">
                    <div className="adminContentControle">
                      {userReqResult.map((result) => (
                        <div key={result._id} className="shownAdminResultCard">
                          <div className="respActiveCard">
                            <div className="imageSection" style={{
                              backgroundImage: `url(http://127.0.0.1:3000/uploads/${result.image})`
                            }}>
                            </div>
                            <div className="respActiveCard_text">
                              <h4>{result.title}</h4>
                              <p>{result.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>}
                </div>
              </div>}
            </div>}
          </div>}

          {activeDiv === "s_notif" && <div id="nofitication">
            <Message />
          </div>}

          {activeDiv === "displayAccounts" && <div id="displayAccounts">
            <div className="display_users">
              <p className="UsersAccouns">All Accounts</p>
              <div className="acc_title">
                <div className="acc_sublinks">
                  <a href="#"
                    className={activeAnchor === 'active_users' ? 'active' : ''}
                    onClick={(e) => handleSubUserAccounts(e, 'active_users')} data-target="active_users">Active</a> {/*click to show */}
                  <a href="#"
                    className={activeAnchor === 'inActive_users' ? 'active' : ''}
                    onClick={(e) => handleSubUserAccounts(e, 'inActive_users')} data-target="inActive_users">Inactive</a>
                </div>
                <button id="create_user" href="#"
                  className={activeAnchor === 'createNewUser' ? 'active' : ''}
                  onClick={(e) => handleCreateUserAccounts(e, 'createNewUser')} data-target="createNewUser">Create User</button>
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
                    {activeAnchor === 'users' && users && users.map(user => (
                      <tr key={user._id}>
                        <td><img className="userimage" src={userIcon} /></td>
                        <td className="key">{user.username}</td>
                        <td>{user.shopname}</td>
                        <td id="last_bord">{user.email}</td>
                      </tr>
                    ))}
                    {activeAnchor === 'active_users' && activeUsers && activeUsers.map(user => (
                      <tr key={user._id}>
                        <td><img className="userimage" src={userIcon} /></td>
                        <td className="key">{user.username}</td>
                        <td>{user.shopname}</td>
                        <td id="last_bord">{user.email}</td>
                        <td><a id="status" onClick={() => updateStatus(user._id)}>Deactivate</a></td> {/*try to solve */}
                      </tr>
                    ))}
                    {activeAnchor === 'inActive_users' && inActiveUsers && inActiveUsers.map(user => (
                      <tr key={user._id}>
                        <td><img className="userimage" src={userIcon} /></td>
                        <td className="key">{user.username}</td>
                        <td>{user.shopname}</td>
                        <td id="last_bord">{user.email}</td>
                        <td><a id="status" onClick={() => updateStatus(user._id)}>Activate</a></td> {/*try to solve */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>}
          {activeDiv === "createNewUser" && (<div id="createNewUser">
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
                <span className="response_result"
                  style={{
                    backgroundColor: res_message === "User Created Successfully" ? "green" : "red",
                    fontSize: "1.5rem",
                    borderRadius: "0.5rem"
                  }}>
                  {res_message && <p>{res_message}</p>}</span>
                <p style={{ color: "red" }}>{createUserErr}</p>
              </div>
              <Button1 onClick={addNewUser}>Create</Button1>
            </div>
          </div>)}


          {activeDiv === "activeAds" && <div id="activeAds">
            {activeResults && activeResults.map((result) => (
              <div key={result._id} className="shownResultCard shownResultCardAdmin">
                <div className="respActiveCard">
                  <div className="imageSection" style={{
                    backgroundImage: `url(http://127.0.0.1:3000/uploads/${result.image})`
                  }}>
                  </div>
                  <div className="respActiveCard_text">
                    <h4>{result.title}</h4>
                    <p>{result.description}</p>
                    <Button2 onClick={() => deActivate(result._id)}>Deactivate</Button2>
                  </div>
                </div>
              </div>
            ))}
          </div>}

          {activeDiv === "pendingAds" && <div id="pendingAds">
            {pendingResults && pendingResults.map((ad) => (
              <div key={ad._id} className="shownResultCard shownResultCardAdmin">
                <div className="respActiveCard">
                  <div className="imageSection" style={{
                    backgroundImage: `url(http://127.0.0.1:3000/uploads/${ad.image})`
                  }}>
                  </div>
                  <div className="respActiveCard_text">
                    <h4>{ad.title}</h4>
                    <p>{ad.description}</p>
                    <Button3 onClick={() => acceptAd(ad._id)}>Accept Request</Button3>
                    <Button2 onClick={() => rejectAd(ad._id)}>Reject Request</Button2>
                  </div>
                </div>
              </div>
            ))}
          </div>}

          {activeDiv === "inActiveAds" && <div id="inActiveAds">
            {inActiveResults && inActiveResults.map((ad) => (
              <div key={ad._id} className="shownResultCard shownResultCardAdmin">
                <div className="respActiveCard">
                  <div className="imageSection" style={{
                    backgroundImage: `url(http://127.0.0.1:3000/uploads/${ad.image})`
                  }}>
                  </div>
                  <div className="respActiveCard_text">
                    <h4>{ad.title}</h4>
                    <p>{ad.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>}

          {activeDiv === "rejectedAds" && <div id="rejectedAds">
            {rejectedResults && rejectedResults.map((ad) => (
              <div key={ad._id} className="shownResultCard shownResultCardAdmin">
                <div className="respActiveCard">
                  <div className="imageSection" style={{
                    backgroundImage: `url(http://127.0.0.1:3000/uploads/${ad.image})`
                  }}>
                  </div>
                  <div className="respActiveCard_text">
                    <h4>{ad.title}</h4>
                    <p>{ad.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>}

        </div>
      </div>
    </div >
  );
}

export default Admin;