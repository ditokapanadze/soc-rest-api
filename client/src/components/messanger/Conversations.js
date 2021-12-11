import axios from "axios";
import React, { useState, useEffect } from "react";
import "./conversations.css";

function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      const res = await axios.get(
        `https://socmedia-rest.herokuapp.com/api/users?userId=${friendId}`
      );
      setUser(res.data);
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={user?.profilePicture} alt="photo" />
      <span className="conversationsName">{user?.username}</span>
    </div>
  );
}

export default Conversations;
