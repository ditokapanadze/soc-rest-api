import "./sidebar.css";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Users } from "../../dummyData";
import axios from "axios";

import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";

import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  const [users, setUsers] = useState([]);

  const { user: currentUser, largeMode, dispatch } = useContext(AuthContext);
  console.log(currentUser);
  useEffect(() => {
    const getUSers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/allusers");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUSers();
  }, []);
  console.log(currentUser?._id);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <p>People you may know </p>
          {/* {users.map((u) =>
            !u.followers.some(currentUser?._id) ? (
              <CloseFriend key={u.id} user={u} />
            ) : (
              ""
            )
          )} */}
          {users.map((u) => {
            if (
              !u.followers.some((follower) => follower === currentUser?._id) &&
              u._id !== currentUser?._id
            ) {
              return <CloseFriend key={u.id} user={u} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
}
