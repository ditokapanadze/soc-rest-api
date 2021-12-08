import React, { useContext, useEffect, useState } from "react";
import Conversations from "./Conversations";
import "./messanger.css";
import Message from "./Message";
import axios from "axios";
import Chatonline from "./Chatonline";
import { AuthContext } from "../../context/AuthContext";

function Messanger() {
  const [converstaions, setConversations] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/conversations/${user._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);

  console.log(converstaions);
  return (
    <div className="messanger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {converstaions.map((c) => (
            <Conversations conversation={c} currentUser={user} />
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message own />
            <Message />
            <Message own />
            <Message own />
            <Message />
            <Message />
            <Message />
            <Message own />
            <Message />
            <Message own />
            <Message />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              name=""
              placeholder="write something..."
            ></textarea>
            <button className="chatSubmitButton">Send</button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <Chatonline />
          <Chatonline />
          <Chatonline />
          <Chatonline />
          <Chatonline />
          <Chatonline />
          <Chatonline />
          <Chatonline />

          <Chatonline />

          <Chatonline />
        </div>
      </div>
    </div>
  );
}

export default Messanger;
