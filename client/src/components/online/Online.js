import "./online.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Online({ userId }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friend, setFriend] = useState([]);
  console.log(userId);
  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/?userId=${userId}`
        );
        console.log(res.data);
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
