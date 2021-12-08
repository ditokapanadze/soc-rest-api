import React from "react";
import "./chatonline.css";

function Chatonline() {
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
