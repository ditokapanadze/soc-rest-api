import React from "react";
import "./message.css";
import { format } from "timeago.js";

function Message({ own, message, img }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={img} />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
}

export default Message;
