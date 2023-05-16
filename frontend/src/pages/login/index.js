import './login.css';
import React, { useEffect } from "react";
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

  useEffect(() => {
    if (logErr) {
      const timer = setTimeout(() => {
        setlogErr('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [logErr]);


  const submit = async (e) => {
    e.preventDefault();
    setlogErr("");

    if (!username) {
      setlogErr("Enter your username");
      return;
    }

    if (!password) {
      setlogErr("Enter your password");
      return;

    } else if (password.length <= 6) {
      setlogErr("Invalid Credentials!");
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
      const responseMessage = response.message;
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
      setlogErr("Invalid Credentials!");
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
          <p style={{color:"#F2441D", fontSize:"1.5rem"}}>{logErr}</p>
        </div>
        <Button1 onClick={submit}>Login</Button1>
      </div>
    </div>
  );
}

export default Login;