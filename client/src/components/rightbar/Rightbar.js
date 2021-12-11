import "./rightbar.css";
import { Users } from "../../dummyData";
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import Online from "../online/Online";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { getUser } from "../../apiCalls";
import HomeRightBar from "./HomeRightBar";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Messanger from "../messanger/Messanger";
import MessangerPopup from "../mesengerPopup/MessangerPopup";

export const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [followed, setFollowed] = useState();
  const [cityInput, setCityInput] = useState(false);
  const [fromInput, setFromInput] = useState(false);
  const [editInfo, setEditInfo] = useState("");
  // const [showChat, setShowChat] = useState(false);
  const [friendId, setFriendId] = useState();
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const inputRef = useRef(null);
  // ვამოწმებს ფლოლოუერებში გვყავს თუ არა ეს პროფილი რო მაგის მიხედვით ფოლოუ და ანფოლოა ღილაკი დარენდერდეს
  useEffect(() => {
    setFollowed(currentUser?.following?.includes(user?._id));
  }, [user?._id]);

  const handleFollow = async () => {
    try {
      if (user?.followers.includes(currentUser?._id)) {
        const res = await axios.put(
          `https://socmedia-rest.herokuapp.com/api/users/${user?._id}/unfollow`,
          { userId: currentUser._id }
        );
        getUser(dispatch);
      } else {
        const res = await axios.put(
          `https://socmedia-rest.herokuapp.com/api/users/${user?._id}/follow`,
          { userId: currentUser._id }
        );
        getUser(dispatch);
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const firendList = await axios.get(
          `https://socmedia-rest.herokuapp.com/api/users/friends/${currentUser._id}`
        );

        setFriends(firendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriends();
  }, [user]);

  const handleClick = (x) => {};

  // };
  const handleChange = () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    let test = inputRef.current.name;
    const token = localStorage.getItem("token");
    let editAdress = {};
    editAdress[inputRef.current.name] = inputRef.current.value;

    try {
      const res = await axios.put(
        "https://socmedia-rest.herokuapp.com/api/users/changeInfo",
        { editAdress },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    setCityInput(false);
    setFromInput(false);
    getUser(dispatch);
  };
  console.log("test");

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
            {cityInput ? (
              <form type="submit" onSubmit={handleSubmit}>
                {" "}
                <input ref={inputRef} name="city" onChange={handleChange} />
              </form>
            ) : (
              ""
            )}
            {/* currentUser?.username === user?.username &&  */}
            {currentUser?._id === user?._id ? (
              <div>
                {!cityInput ? (
                  <ModeEditOutlinedIcon
                    onClick={() => {
                      setCityInput(!cityInput);
                      setFromInput(false);
                    }}
                    className="edit__btn"
                  />
                ) : (
                  <SaveOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={handleSubmit}
                  />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="rightbarInfoItem">
            <div className="info__container">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            {/* {showInput ? (
              <form type="submit">
                {" "}
                <input ref={inputRef} name="from" onChange={handleChange} />
              </form>
            ) : (
              ""
            )} */}

            {currentUser?._id === user?._id ? (
              <div>
                {fromInput ? (
                  <form type="submit" onSubmit={handleSubmit}>
                    {" "}
                    <input ref={inputRef} name="from" onChange={handleChange} />
                  </form>
                ) : (
                  ""
                )}
                {currentUser?.username === user?.username && !fromInput ? (
                  <ModeEditOutlinedIcon
                    className="edit__btn"
                    onClick={() => {
                      setFromInput(!fromInput);
                      setCityInput(false);
                    }}
                  />
                ) : (
                  <SaveOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={handleSubmit}
                  />
                )}
              </div>
            ) : (
              ""
            )}
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
            {currentUser?.username === user?.username && (
              <ModeEditOutlinedIcon
                className="edit__btn"
                onClick={handleClick}
              />
            )}
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
  console.log(friendId);
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? (
          <ProfileRightbar />
        ) : (
          <HomeRightBar
            showChat={showChat}
            setShowChat={setShowChat}
            setFriendId={setFriendId}
          />
        )}
        {/* <HomeRightBar /> */}
        {showChat ? (
          <Messanger small x={friendId} setShowChat={setShowChat} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
