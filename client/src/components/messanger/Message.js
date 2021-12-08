import React from "react";
import "./message.css";
import { format } from "timeago.js";

function Message({ own, message }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://res.cloudinary.com/dr7mu778b/image/upload/v1636802655/noAvatar_fqthh6.png"
        />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
}

export default Message;
