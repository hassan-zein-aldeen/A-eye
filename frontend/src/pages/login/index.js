import './login.css';
import React from "react";
import Button1 from "../../components/Button1/Button";
import login_img from "../../images/logo.svg";
import user_icon from "../../icons/user.svg";
import pass_icon from "../../icons/pass.svg";

const Login = () => {

  return (
    <div className="popup">

      <a id="back" href="http://localhost:3001/">Home</a>
      <div className="form">

        <img className="logo" src={login_img} alt="login_img" />
        <p>Login</p>
        <div className="cred">

          <div className='user_cred'>
            <img src={user_icon} alt='uicon' />
            <input type="text" id="username" placeholder="Username" />
          </div>

          <div className='user_cred'>
            <img src={pass_icon} alt='picon' />
            <input type="password" id="password" placeholder="Password"/>
          </div>

          <a className='forget' href="http:/localhost:3001/">Forget Password?</a>
        </div>
        <Button1>Login</Button1>
      </div>

    </div>
  );
}

export default Login;