import React, { useEffect, useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Tobar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddAPhotoOutlined } from "@material-ui/icons";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Resizer from "react-image-file-resizer";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [baseImage, setBaseImage] = useState("");
  const username = useParams().username;
  console.log(username);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users?username=${username}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [username]);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1500,
        1500,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  const uploadImage = async (e) => {
    try {
      const file = e.target.files[0];
      // const image = await resizeFile(file);
      setBaseImage(file);
    } catch (err) {
      console.log(err);
    }
    // const file = e.target.files[0];
    // const base64 = await convertBase64(file);
    // setBaseImage(base64);
  };
  const uploadAvatar = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const avatar = baseImage;
    let formData = new FormData();
    formData.append("file", avatar);
    console.log(formData);
    const test = { asda: "asd" };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/changeavatar",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.config.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                className="profileCoverImg"
              />

              <img
                src={
                  baseImage
                    ? URL.createObjectURL(baseImage)
                    : user.profilePicture
                }
                className="profileUserImg"
              />
              <label htmlFor="file">
                {" "}
                {baseImage ? (
                  <>
                    <CloudUploadOutlinedIcon
                      className="add__photo__icon upload"
                      onClick={uploadAvatar}
                    />
                    <p className="upload__tooltip"> Click to upload</p>
                  </>
                ) : (
                  <AddAPhotoOutlined
                    style={{ cursor: "pointer" }}
                    className="add__photo__icon"
                  />
                )}
                <input
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                  style={{ display: "none" }}
                  type={baseImage ? "" : "file"}
                  id="file"
                  name="file"
                  accept=".png, .jpeg, .jpg"
                />
              </label>
            </div>

            <div className="profileInfo">
              <h4 className="prifileInfoName">
                {user?.username?.charAt(0).toUpperCase() +
                  user?.username?.slice(1)}
              </h4>
              <span className="prifileInfoDesc"> {user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
