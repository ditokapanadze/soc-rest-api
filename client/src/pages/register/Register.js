import axios from "axios";

import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { register } from "../../apiCalls";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [username, setUsername] = useState("");
  const passwordRef = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const history = useHistory();
  console.log(error);
  const handleClick = async (e) => {
    console.log(password);
    console.log(repassword);
    e.preventDefault();
    if (password !== repassword) {
      passwordRef.current.setCustomValidity("passwords don't match");
    } else {
      const user = {
        username,
        password,
        email,
      };
      register(user, dispatch);
    }
  };

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
          <form className="registerBox" onSubmit={handleClick}>
            <input
              minLength="3"
              maxLength="25"
              required
              type="text"
              placeholder="Username"
              className="loginInput"
              onChange={(e) => setUsername(e.target.value)}
            />
            <span style={{ color: "Red", fontSize: "20px" }}> {error} </span>
            <input
              required
              type="email"
              placeholder="Email"
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              ref={passwordRef}
              required
              minLength="6"
              type="password"
              placeholder="Password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Repeat password"
              className="loginInput"
              onChange={(e) => setRepassword(e.target.value)}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <div
              className="loginRegisterButton"
              onClick={() => history.push("/login")}
            >
              Log into account
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
