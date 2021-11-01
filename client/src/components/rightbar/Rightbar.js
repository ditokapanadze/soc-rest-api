import "./rightbar.css";
import { Users } from "../../dummyData";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Online from "../online/Online";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);

  const { user: currentUser } = useContext(AuthContext);
  console.log(currentUser);
  // ვამოწმებს ფლოლოუერებში გვყავს თუ არა ეს პროფილი რო მაგის მიხედვით ფოლოუ და ანფოლოა ღილაკი დარენდერდეს
  useEffect(() => {
    setFollowed(currentUser?.following?.includes(user?._id));
  }, [user?._id]);

  console.log("followed");

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `http://localhost:5000/api/users/friends/${user._id}`
        );
        console.log(friendList.data);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    console.log("Test");
  }, [user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        const res = await axios.put(
          `http://localhost:5000/api/users/${user?._id}/unfollow`,
          { userId: currentUser._id }
        );
        console.log(res.data);
      } else {
        const res = await axios.put(
          `http://localhost:5000/api/users/${user?._id}/follow`,
          { userId: currentUser._id }
        );
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user?.username !== currentUser?.username ? (
          <button className="rightbarFollowbutton" onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        ) : (
          ""
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={`/profile/${friend.username}`}>
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
