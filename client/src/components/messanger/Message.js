import React from "react";
import "./message.css";

function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://res.cloudinary.com/dr7mu778b/image/upload/v1636802655/noAvatar_fqthh6.png"
        />
        <p className="messageText">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution
        </p>
      </div>
      <div className="messageBottom">1 Hour ago</div>
    </div>
  );
}

export default Message;
