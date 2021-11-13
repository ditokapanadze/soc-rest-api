import "./rightbar.css";
import { Users } from "../../dummyData";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Online from "../online/Online";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { getUser } from "../../apiCalls";
export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState();
  const [editValue, setEditValue] = useState("");
  const { user: currentUser, dispatch } = useContext(AuthContext);

  // ვამოწმებს ფლოლოუერებში გვყავს თუ არა ეს პროფილი რო მაგის მიხედვით ფოლოუ და ანფოლოა ღილაკი დარენდერდეს
  useEffect(() => {
    setFollowed(currentUser?.following?.includes(user?._id));
  }, [user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `http://localhost:5000/api/users/friends/${user._id}`
        );
        console.log(friendList);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    console.log("Test");
  }, [user]);
  console.log(friends);
  const handleFollow = async () => {
    try {
      if (user?.followers.includes(currentUser?._id)) {
        const res = await axios.put(
          `http://localhost:5000/api/users/${user?._id}/unfollow`,
          { userId: currentUser._id }
        );
        getUser(dispatch);
      } else {
        const res = await axios.put(
          `http://localhost:5000/api/users/${user?._id}/follow`,
          { userId: currentUser._id }
        );
        getUser(dispatch);
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
  console.log(user?.username);
  console.log(currentUser?.username);

  const handleClick = () => {
    // setEditValue(user.city);
  };
  const handleChange = (e) => {
    setEditValue(e.target.value);
  };
  console.log(editValue);
  const Input = ({ value, onChange }) => {
    console.log("Render");
    return <input value={value} onChange={onChange} />;
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
            <div className="info__container">
              {" "}
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <ModeEditOutlinedIcon className="edit__btn" onClick={handleClick} />
          </div>
          <div className="rightbarInfoItem">
            <div className="info__container">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <ModeEditOutlinedIcon className="edit__btn" />
          </div>
          <div className="rightbarInfoItem">
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
            <ModeEditOutlinedIcon className="edit__btn" />
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={`/profile/${friend?.username}`}>
              <div className="rightbarFollowing">
                <img
                  src={friend.profilePicture}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">
                  {friend?.username}
                </span>
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
