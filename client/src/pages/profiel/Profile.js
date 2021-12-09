import React, { useEffect, useContext, useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Tobar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddAPhoto } from "@material-ui/icons";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Resizer from "react-image-file-resizer";
import { getUser } from "../../apiCalls";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { AuthContext } from "../../context/AuthContext";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [editInfo, setEditInfo] = useState("");
  const [avatarImg, setAvatarImg] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [showInput, setShowInput] = useState(false);
  const username = useParams().username;
  const { user: currentUser, dispatch } = useContext(AuthContext);

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
      console.log("test test");
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("test test efeqti");
    fetchUser();
  }, [username, currentUser]);

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
    console.log(e.target.id);
    console.log(
      "ASdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsd"
    );
    if (e.target.id === "cover") {
      const file = e.target.files[0];
      // const image = await resizeFile(file);
      setCoverImage(file);
    } else {
      const file = e.target.files[0];
      // const image = await resizeFile(file);
      setAvatarImg(file);
    }

    // const file = e.target.files[0];
    // const base64 = await convertBase64(file);
    // setBaseImage(base64);
  };
  console.log(user);
  const UploadPhoto = async (e) => {
    console.log(e);

    const token = localStorage.getItem("token");

    // const cover = coverImage;
    // console.log(avatar);
    if (e === "avatar") {
      const avatar = avatarImg;
      let formData = new FormData();
      formData.append("file", avatar);
      formData.append("type", "avatar");

      console.log(formData);
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
        setAvatarImg("");
        fetchUser();
        getUser(dispatch);
      } catch (err) {
        console.log(err.response);
      }
    } else if (e === "cover") {
      const cover = coverImage;
      let formData = new FormData();
      formData.append("file", cover);
      formData.append("type", "cover");
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
        setCoverImage("");
        fetchUser();
        getUser(dispatch);
      } catch (err) {
        console.log(err.response);
      }
    }
  };
  console.log(avatarImg);
  const handleClick = () => {
    setEditInfo(user?.desc);
    setShowInput(!showInput);
  };

  const changeInfo = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    console.log(editInfo);
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/changeInfo",
        { editInfo },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUser();
      setShowInput(false);
      setEditInfo("");
    } catch (err) {
      console.log(err.response);
    }
  };

  console.log(user);
  console.log(currentUser);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture}
                src={
                  coverImage
                    ? URL.createObjectURL(coverImage)
                    : user.coverPicture
                }
                className="profileCoverImg"
              />
              {user?._id === currentUser?._id ? (
                <label htmlFor="cover">
                  {coverImage ? (
                    <div
                      onClick={(e) => UploadPhoto("cover")}
                      className="coverupload__icon icon__container"
                    >
                      <CloudUploadOutlinedIcon className="add__photo__icon upload" />
                      <p className="upload__tooltip" style={{ color: "white" }}>
                        {" "}
                        Click to upload
                      </p>
                    </div>
                  ) : (
                    <div className="coverupload__icon icon__container">
                      <AddAPhoto />
                    </div>
                  )}{" "}
                  <input
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                    style={{ display: "none" }}
                    type={coverImage ? "" : "file"}
                    id="cover"
                    accept=".png, .jpeg, .jpg"
                  />
                </label>
              ) : (
                ""
              )}

              <img
                src={
                  avatarImg
                    ? URL.createObjectURL(avatarImg)
                    : user.profilePicture
                }
                className="profileUserImg"
              />
              {user?._id === currentUser?._id ? (
                <label htmlFor="file">
                  {" "}
                  {avatarImg ? (
                    <div
                      name="name"
                      id="id"
                      onClick={(e) => UploadPhoto("avatar")}
                      className="uploadicon__container icon__container"
                    >
                      <CloudUploadOutlinedIcon
                        id="id"
                        className="add__photo__icon upload"
                      />
                      <p className="upload__tooltip"> Click to upload</p>
                    </div>
                  ) : (
                    <div className="uploadicon__container icon__container">
                      {" "}
                      <AddAPhoto
                        style={{ cursor: "pointer" }}
                        className="add__photo__icon"
                      />
                    </div>
                  )}
                  <input
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                    style={{ display: "none" }}
                    type={avatarImg ? "" : "file"}
                    id="file"
                    name="file"
                    accept=".png, .jpeg, .jpg"
                  />
                </label>
              ) : (
                ""
              )}
            </div>

            <div className="profileInfo">
              <h4 className="prifileInfoName">
                {user?.username?.charAt(0).toUpperCase() +
                  user?.username?.slice(1)}
              </h4>
              <div style={{ display: "flex", alignItems: "center" }}>
                {!showInput && (
                  <span className="prifileInfoDesc"> {user?.desc}</span>
                )}

                {showInput ? (
                  <form type="submit" onSubmit={changeInfo}>
                    <input
                      value={editInfo}
                      onChange={(e) => setEditInfo(e.target.value)}
                    />
                  </form>
                ) : (
                  ""
                )}
                {user?.username === currentUser?.username ? (
                  showInput ? (
                    <SaveOutlinedIcon
                      onClick={changeInfo}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <ModeEditOutlinedIcon
                      onClick={handleClick}
                      style={{
                        cursor: "pointer",
                        marginLeft: "20px",
                        marginTop: "5px",
                        fontSize: "20px",
                      }}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
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
