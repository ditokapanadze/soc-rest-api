import axios from "axios";
import decode from "jwt-decode";
import { useHistory } from "react-router-dom";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      userCredentials
    );
    const { token, user } = res.data;
    localStorage.setItem("token", token);

    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const getUser = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const { userId } = await decode(token);
    console.log(userId);
    console.log("userId");
    const res = await axios.get(
      `http://localhost:5000/api/users/?userId=${userId}`
    );
    console.log(res.data);
    dispatch({ type: "GET_USER", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
