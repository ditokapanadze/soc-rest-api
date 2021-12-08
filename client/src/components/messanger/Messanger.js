import React, { useContext, useEffect, useState, useRef } from "react";
import Conversations from "./Conversations";
import "./messanger.css";
import Message from "./Message";
import axios from "axios";
import Chatonline from "./Chatonline";
import { AuthContext } from "../../context/AuthContext";

function Messanger() {
  const [converstaions, setConversations] = useState([]);
  const [currentChat, seCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
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

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const sendMesssage = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/messages/`,
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messanger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {converstaions.map((c) => (
            <div onClick={() => seCurrentChat(c)}>
              <Conversations
                conversation={c}
                currentUser={user}
                onClick={() => alert("Asd")}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              {" "}
              <div className="chatBoxTop">
                {messages.map((message) => (
                  <div ref={scrollRef}>
                    <Message
                      message={message}
                      own={message.sender === user?._id ? true : false}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  name=""
                  value={newMessage}
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>
                <button className="chatSubmitButton" onClick={sendMesssage}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span>Open a conversation To start a chat</span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <Chatonline />
        </div>
      </div>
    </div>
  );
}

export default Messanger;
