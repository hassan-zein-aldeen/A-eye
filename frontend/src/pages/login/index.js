import "./login.css";
import React from "react";
import Button1 from "../../components/Button1/Button";
import login_img from "../../images/logo.svg";

const Login = () => {

  return (
    <div className="popup">
      <a id="back">Home</a>
      <div className="form">
        <img className="logo" src={login_img} alt="login_img" />
        <p>Login</p>
        <div className="cred">
          <label for="username">Email</label>
          <input type="text" id="username" placeholder="Enter Your Username" />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter Your Password" />
        </div>
        <Button1>Login</Button1>
      </div>
    </div>
  );
}

export default Login;