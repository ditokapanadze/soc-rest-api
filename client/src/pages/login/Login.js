import React from "react";
import "./login.css";
function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            {" "}
            Connect with friend and the word around you on Lamasocial
          </span>
        </div>
        <div className="loginRight">
          {" "}
          <div className="loginBox">
            <input type="text" placeholder="Email" className="loginInput" />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
            />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password? </span>
            <button className="loginRegisterButton">Create a new acount</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
