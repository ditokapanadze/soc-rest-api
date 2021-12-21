import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Messanger from "../messanger/Messanger";
import Online from "../online/Online";

function HomeRightBar({ setShowChat, setFriendId }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser, dispatch } = useContext(AuthContext);

  console.log("render");
  const handleClick = (id) => {
    setFriendId(id);
    setShowChat(true);
    console.log("click");
    localStorage.setItem("showChat", true);
    localStorage.setItem("friendId", id);
  };
  return (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="assets/gift.png" alt="" />
        <span className="birthdayText">
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </span>
      </div>

      <h4 className="rightbarTitle">Online Friends</h4>

      <ul className="rightbarFriendList">
        {currentUser?.following.map((id) => (
          <div
            style={{ cursor: "pointer" }}
            className="test"
            key={id}
            onClick={() => handleClick(id)}
          >
            <Online userId={id} />
          </div>
        ))}
      </ul>
    </>
  );
}

export default HomeRightBar;
