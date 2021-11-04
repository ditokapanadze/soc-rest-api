import React, { useContext, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isFatching, error, dispatch } = useContext(AuthContext);
  let history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
    history.push("/");
  };

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
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Email"
              required
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span style={{ color: "red", fontSize: "22px" }}> {error}</span>
            <input
              required
              type="password"
              minLength="6"
              placeholder="Password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" disabled={isFatching} type="submit">
              {isFatching ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password? </span>
            <div
              className="loginRegisterButton"
              onClick={() => history.push("/register")}
            >
              {" "}
              {isFatching ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                "Create a new account"
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
