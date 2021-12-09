import axios from "axios";
import React, { useState, useEffect } from "react";
import "./chatonline.css";

function Chatonline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlieFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        `http://localhost:5000/users/friends${currentId}`
      );
    };
  }, []);

  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://res.cloudinary.com/dr7mu778b/image/upload/v1636802655/noAvatar_fqthh6.png"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Jon doe</span>
      </div>
    </div>
  );
}

export default Chatonline;
