import "./online.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Online({ userId }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friend, setFriend] = useState([]);
  console.log(friend);
  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const res = await axios.get(
          `https://socmedia-rest.herokuapp.com/api/users/?userId=${userId}`
        );

        setFriend(res.data);
      } catch (err) {}
    };
    fetchFriend();
  }, [userId]);
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          alt=""
          src={friend.profilePicture}
        />
        {friend.online ? <span className="rightbarOnline"></span> : ""}
      </div>
      <span className="rightbarUsername">{friend.username}</span>
    </li>
  );
}
