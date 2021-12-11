import axios from "axios";
import decode from "jwt-decode";
import { useHistory } from "react-router-dom";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "https://socmedia-rest.herokuapp.com/api/auth/login",
      userCredentials
    );
    const { token, user } = res.data;
    localStorage.setItem("token", token);

    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data.message });
  }
};

export const getUser = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const { userId } = await decode(token);

    const res = await axios.get(
      `https://socmedia-rest.herokuapp.com/api/users/?userId=${userId}`
    );

    dispatch({ type: "GET_USER", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
// export const getUser = async (dispatch) => {
//   const token = localStorage.getItem("token");
//   try {
//     const res = await axios.get(`http://localhost:5000/api/users`, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(res);
//     dispatch({ type: "GET_USER", payload: res.data });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const register = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      user
    );
    localStorage.setItem("token", res.data.token);

    dispatch({ type: "REGISTER", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message });
  }
};

export const largePost = (dispatch) => {
  dispatch({ type: "LARGEMODE" });
};
