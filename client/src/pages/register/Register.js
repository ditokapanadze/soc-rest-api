import axios from "axios";

import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [username, setUsername] = useState("");
  const passwordRef = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const history = useHistory();

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
      console.log(user);
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          user
        );
        console.log(res);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
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
              required
              type="text"
              placeholder="Username"
              className="loginInput"
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <button className="loginRegisterButton">Log into acount</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
