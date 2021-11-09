import "./topbar.css";
import Recat, { useState, useRef } from "react";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Redact, { useContext, useEffect } from "react";
import { getUser } from "../../apiCalls";
import { GoSignOut } from "react-icons/go";
import { AiFillSetting } from "react-icons/ai";
import { useHistory } from "react-router";
import { logout } from "../../context/AuthActions";
import axios from "axios";
import decode from "jwt-decode";
export default function Topbar() {
  const [showPopup, setShowPopup] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(AuthContext);
  let history = useHistory();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const { userId } = await decode(token);
    localStorage.clear();
    history.push("/login");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/logout/${userId}`
      );
    } catch (err) {}
  };

  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      showPopup && e.target !== ref.current && setShowPopup(false);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showPopup]);
  console.log(user);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          {" "}
          <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="profile__link">
          <img
            onClick={() => setShowPopup(!showPopup)}
            src={user?.profilePicture}
            alt=""
            className="topbarImg"
          />
          <p className="profile__tooltip">Account </p>
          {showPopup && (
            <ul ref={ref} className="topbar__ul">
              <li
                onClick={() => history.push(`/profile/${user?.username}`)}
                className="topbar__li"
              >
                {" "}
                <img src={user?.profilePicture} alt="" className="popup__img" />
                <p className="topbar__name">
                  {user?.username.charAt(0).toUpperCase() +
                    user?.username.slice(1)}{" "}
                  <br />
                  <span>see your profile</span>{" "}
                </p>
              </li>

              <li className="topbar__li">
                {" "}
                <AiFillSetting /> <p>Edit your info </p>
              </li>
              <li onClick={handleLogout} className="topbar__li">
                {" "}
                <GoSignOut />
                <p> Log Out</p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
