import axios from "axios";
import React, { useState, useEffect } from "react";
import "./chatonline.css";

function Chatonline({ friend }) {
  const [friends, setFriends] = useState([]);
  const [onlieFriends, setOnlineFriends] = useState([]);

  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://res.cloudinary.com/dr7mu778b/image/upload/v1636802655/noAvatar_fqthh6.png"
            alt=""
          />
        </div>
        <p className="chatOnlineName">{friend.username}</p>
        <p className="chatOnlineName">lives: {friend.city}</p>
        <p className="chatOnlineName">from: {friend.from}</p>
      </div>
    </div>
  );
}

export default Chatonline;
