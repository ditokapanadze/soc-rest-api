import "./closeFriend.css";

export default function CloseFriend({ user }) {
<<<<<<< HEAD
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF + user.profilePicture} alt="" />
=======
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
>>>>>>> 42520e43df142fbd9514bf15e616dd6d6d412282
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
