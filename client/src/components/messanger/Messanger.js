import React, { useContext, useEffect, useState, useRef } from "react";
import Conversations from "./Conversations";
import "./messanger.css";
import Message from "./Message";
import axios from "axios";
import Chatonline from "./Chatonline";
import { AuthContext } from "../../context/AuthContext";
import io from "socket.io-client";
import { useParams, useHistory, Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function Messanger({ small, x, setShowChat, showChat }) {
  const [converstaions, setConversations] = useState([]);
  const [currentChat, seCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [friend, setFriend] = useState([]);

  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef();
  const { id } = useParams();
  let history = useHistory();
  console.log(x);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `https://socmedia-rest.herokuapp.com/api/conversations/${user?._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id, id, x]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `https://socmedia-rest.herokuapp.com/api/messages/${id}`
        );

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    let friendId;
    const getCoversation = async () => {
      try {
        const res = await axios
          .get(`http://localhost:5000/api/conversations/convo/${id}`)
          .then((res) => {
            getCoversation(res.data);

            friendId = res.data.members.filter((x) => x !== user?._id);
          });
      } catch (err) {
        console.log(err);
      }
    };

    getCoversation().then(() => {
      if (!small && id) {
        friendId = friendId[0];
        const getUser = async () => {
          const res = await axios.get(
            `https://socmedia-rest.herokuapp.com/api/users?userId=${friendId}`
          );

          setFriend(res.data);
        };
        getUser();
      } else {
        const getUser = async () => {
          const res = await axios.get(
            `https://socmedia-rest.herokuapp.com/api/users?userId=${x}`
          );

          setFriend(res.data);
        };
        getUser();
      }
    });

    getMessages();
  }, [id, user?._id, x]);

  const sendMesssage = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    console.log(message);
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    console.log(receiverId);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        `https://socmedia-rest.herokuapp.com/api/messages`,
        message
      );
      console.log(res);
      setMessages([...messages, res.data]);

      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(messages);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  }, [messages]);

  const handleClick = (c) => {
    console.log("Asdasd");
    seCurrentChat(c);
    history.push(`/messanger/${c._id}`);
    const friendId = c.members.filter((member) => member !== user?._id);

    // const getUser = async () => {
    //   const res = await axios.get(
    //     `https://socmedia-rest.herokuapp.com/api/users?userId=${friendId}`
    //   );
    //   setFriend(res.data);
    // };
    // getUser();
  };
  // for small popup messanger

  useEffect(() => {
    let chetId;

    console.log("aqaa");
    if (x) {
      const getConversations = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/conversations/${user?._id}`
          );
          console.log(user?._id);
          console.log(res);
          res.data.forEach((convo) => {
            if (convo.members.includes(x)) {
              seCurrentChat(convo);
              console.log("Aqaa");
              chetId = convo._id;
            }
          });
        } catch (err) {
          console.log(err);
        }
      };
      // console.log(chetId);
      const getMessages = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/messages/${chetId}`
          );

          setMessages(res.data);
        } catch (err) {
          console.log(err.response);
        }
      };
      getConversations().then(() => {
        getMessages();
      });
    }
  }, [x, user?._id]);
  // console.log(currentChat);
  const handleChange = (e) => {
    if (e.key === "Enter") {
    } else {
      setNewMessage(e.target.value);
    }
  };

  const test = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      sendMesssage(e);
    }
  };
  console.log(currentChat);
  return (
    <div className={small ? "messanger smallMessanger" : `messanger`}>
      <div className={small ? "hidden" : "chatMenu"}>
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {converstaions.map((c) => (
            <div
              onClick={() => {
                setShowChat(true);
                handleClick(c);
              }}
            >
              <Conversations
                conversation={c}
                currentUser={user}
                onClick={() => alert("Asd")}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={small ? "chatBox chatBoxSmall" : "chatBox"}>
        <div className={small ? "chatHeader chatHeaderSmall" : "chatHeader"}>
          <Link to={`/profile/${friend.username}`}>
            {" "}
            <div style={{ display: "flex" }}>
              <img className="chatHeaderImg" src={friend.profilePicture} />
              <div className="chatHeaderInfo">
                <p>{friend.username}</p>
                <span>active 2h ago</span>
              </div>
            </div>
          </Link>
          <IoClose onClick={() => setShowChat(false)} className="CloseIcon" />
        </div>

        <div
          className={small ? "chatBboxWrapper smallWrapper" : "chatBoxWrapper"}
        >
          {id || x ? (
            <>
              {" "}
              <div
                className={small ? "chatBoxTop chatBoxTopSmall " : "chatBoxTop"}
              >
                {messages.map((message) => (
                  <div ref={scrollRef}>
                    <Message
                      img={friend.profilePicture}
                      message={message}
                      own={message.sender === user?._id ? true : false}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <form
                  className={small ? "chatFormSmall" : "chatForm"}
                  type="submit"
                  onSubmit={sendMesssage}
                  // onKeyDown={sendMesssage}
                >
                  <textarea
                    className="chatMessageInput"
                    name=""
                    value={newMessage}
                    placeholder="write something..."
                    onKeyPress={(e) => test(e)}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                  <input
                    type="submit"
                    style={{ display: "none" }}
                    onClick={sendMesssage}
                  />
                </form>
              </div>
            </>
          ) : (
            <span>Open a conversation To start a chat</span>
          )}
        </div>
      </div>
      <div className={small ? "hidden" : "chatOnline"}>
        <div className="chatOnlineWrapper">
          <Chatonline friend={friend} />
        </div>
      </div>
    </div>
  );
}

export default Messanger;
