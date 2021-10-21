import React from "react";
import "./register.css";
function Register() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friend and the word around you on Lamasocial
          </span>
        </div>
        <div className="loginRight">
          <div className="registerBox">
            <input type="text" placeholder="Username" className="loginInput" />
            <input type="email" placeholder="Email" className="loginInput" />
            <input
              type="password"
              placeholder="Repeat Password"
              className="loginInput"
            />
            <input
              type="password"
              placeholder=" password"
              className="loginInput"
            />
            <button className="loginButton">Sign Up</button>

            <button className="loginRegisterButton">Log into acount</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
