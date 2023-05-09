import './login.css';
import React from "react";
import Button1 from "../../components/Button1/Button";
import login_img from "../../images/logo.svg";
import user_icon from "../../icons/user.svg";
import pass_icon from "../../icons/pass.svg";
import { useState } from 'react';
import axios from "axios";

const Login = () => {

  const [credErr, setcredError] = useState("");
  const [logErr, setlogErr] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!username) {
      console.log("no user name");
      setlogErr("Enter username");
      return;
    }

    if (!password) {
      console.log("no password");
      setlogErr("Enter password");
      return;

    } else if (password.length <= 6) {
      console.log("Invalid Credentials");
      setcredError("Invalid Credentials");
      return;
    }

    const crdntials = {
      "username": username,
      "password": password,
    }

    try {
      const response = await axios.post("http://127.0.0.1:3000/auth/login", crdntials);
      const token = response.data.token;
      const role = response.data.role;
      const username = response.data.username;
      const id = response.data.role._id;
      const shopname = response.data.shopname.shopname;
      const status = response.data.status;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role.role);
      localStorage.setItem("username", username);
      localStorage.setItem("id", id)
      localStorage.setItem("shopname", shopname);
      localStorage.setItem("status", status.status);

      if (role.role === "user") {
        window.location.href = "/User"
      } else if (role.role === "admin") {
        window.location.href = "/Admin";
      }

    } catch (e) {
      console.log(e);
    }

  }

  return (
    <div className="popup">

      <div className="form">
        <a href="http://127.0.0.1:3001/Home">
        <img
          id="loginImg"
          style={{ width: "11rem" }}
          src={login_img}
          alt="login Logo"
        />
      </a>
        <p>Login</p>
        <div className="cred">

          <div className='user_cred'>
            <img src={user_icon} alt='uicon' />
            <input type="text" id="username" placeholder="Username"
              onChange={(e) => { setUsername(e.target.value) }} />
          </div>

          <div className='user_cred'>
            <img src={pass_icon} alt='picon' />
            <input type="password" id="password" placeholder="Password"
              onChange={(e) => { setPassword(e.target.value) }} />
          </div>
        </div>
        <Button1 onClick={submit}>Login</Button1>
      </div>

    </div>
  );
}

export default Login;